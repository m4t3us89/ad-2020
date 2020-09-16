import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from '../schemas/Person'
import { PersonDto } from './../dto/person.dto';
import { shuffles } from './../utils/FisherYates'
import { MailProvider } from '../providers/implementations/Mail.provider'


@Injectable()
export class PersonService {
  constructor(@InjectModel(Person.name) private personModel: Model<Person>) {}

  //CRUD
  create(personDto : PersonDto): Promise<Person> {
    const createdPerson = new this.personModel(personDto);
    return createdPerson.save();
  }

  get(idPerson : Number) : Promise<Person>{
    return this.personModel.findById(idPerson).exec();
  }

  getAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }

  delete(idPerson : Number): Promise<Person>{
    return this.personModel.findOneAndDelete(idPerson).exec();
  }

  deleteAll() : Promise<any>{
    return this.personModel.remove({}).exec();
  }

  update(idPerson : Number, psersonDto:PersonDto): Promise<Person>{
    return this.personModel.updateOne({_id:idPerson},psersonDto).exec()
  }
  // 



  //PROCESS
  async drawPeople(): Promise<void>{
    const people = await this.getAll()
    
    if(people.length % 2) throw new Error('Número insuficiente de participantes.')
    
    const shufflesPeople = [...people]
    
    shuffles(shufflesPeople);
 
    const mailGunProvider = new MailProvider()

    const promises = people.map( async (person,index)=>{
        person.friend = shufflesPeople[index].name;
        await this.update(person.id, person)
        await mailGunProvider.sendEmail('amigosecreto@suporte.com',person.email,'Olá, já temos o seu amigo secreto, espero que goste. =)', `Você tirou: <b>${shufflesPeople[index].name}</b>` )
    })

    await Promise.all(promises); //CLARO, QUE ESSA NÃO É A MELHOR SOLUÇÃO PARA UM PROJETO "VERDADEIRO"
    
  }

    
}
