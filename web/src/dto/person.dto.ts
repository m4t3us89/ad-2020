import { IsEmail, IsNotEmpty,  } from 'class-validator';

export class PersonDto {

  @IsEmail({},{message:'O email não é válido'})
  email: string;

  @IsNotEmpty({message:'O nome é obrigatório'})
  name: string;

  friend : string;

}