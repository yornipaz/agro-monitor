import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelsModule } from './modules/parcels/parcels.module';
import { ActivitiesModule } from './modules/activities/activities.module';

@Module({
  imports: [ParcelsModule, ActivitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
