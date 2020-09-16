import { Controller, Get,Post, Delete, Put, Param, Res, Req, HttpStatus, Body} from '@nestjs/common';
import { Response } from 'express';
import { PersonService } from './person.service';
import { PersonDto } from './../dto/person.dto';

const enumMongoError = {
  11000 : 'Email já cadastrado'
};

@Controller('person')
export class PersonController {
  constructor(private readonly appService: PersonService) {}

  @Post()
  async create(@Res() res: Response, @Body() personDto: PersonDto){
    try{
      const createdPerson = await this.appService.create(personDto)
      res.status(HttpStatus.OK).json(createdPerson);
    }catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({message : error?.code ? enumMongoError[error.code] : error.message});
    }
  }

  @Get()
  async getAll(){
    try{
      const people = await this.appService.getAll()
      return people;
    }catch(error){}
  }

  @Delete(':id')
  async delete(@Param() params,@Res() res: Response){
    try{
      const deletedPerson = await this.appService.get(params.id)
      await this.appService.delete(deletedPerson.id)
      res.status(HttpStatus.OK).json(deletedPerson);
    }catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({message : error.message});
    }
  }

  @Delete()
  async deleteAll(){
    await this.appService.deleteAll();
    return 'Executado'
  }

  @Put('draw')
  async drawPeople(@Res() res: Response){
    try{
      await this.appService.drawPeople()
      res.status(HttpStatus.OK).json();
    }catch(error){
      console.log('Error' , error)
      res.status(HttpStatus.BAD_REQUEST).json({message : error.message});
    }
  }

}
