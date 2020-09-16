import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop()
  name: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  friend: string;

}

export const PersonSchema = SchemaFactory.createForClass(Person);


