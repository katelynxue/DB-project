import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeoplesModule } from './peoples/peoples.module';

@Module({
  imports: [PeoplesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
