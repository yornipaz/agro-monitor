import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity } from './entity/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from '../parcels/entity/parcel.entity';
import { Supply } from './entity/supply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Parcel, Supply])],
  providers: [ActivitiesService],
  controllers: [ActivitiesController]
})
export class ActivitiesModule { }
