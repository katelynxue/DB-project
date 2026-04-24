import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeoplesModule } from './peoples/peoples.module'; // kept almost exactly the same as video

@Module({
  imports: [PeoplesModule, MongooseModule.forRoot(
    'mongodb+srv://apple:apple@cluster0.ofnvdrh.mongodb.net/nestjs-project'
  ),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
