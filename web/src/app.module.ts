import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './person/person.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true}),
    PersonModule
  ],
  providers: [],
})
export class AppModule {}
