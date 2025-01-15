import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelsModule } from './modules/parcels/parcels.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './common/config/typeorm.config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    ParcelsModule,
    ActivitiesModule,

  ],
  controllers: [AppController],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe },],
})
export class AppModule { }
