import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from './entity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Activity)
        private readonly activitiesRepository: Repository<Activity>,
    ) { }

    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
        const activity = this.activitiesRepository.create(createActivityDto);
        return this.activitiesRepository.save(activity);
    }

    async findAll(): Promise<Activity[]> {
        return this.activitiesRepository.find({ relations: ['parcel'] });
    }

    async findOne(id: string): Promise<Activity> {
        const activity = await this.activitiesRepository.findOne({
            where: { id },
            relations: ['parcel'],
        });
        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }
        return activity;
    }

    async update(
        id: string,
        updateActivityDto: Partial<CreateActivityDto>,
    ): Promise<Activity> {
        const activity = await this.findOne(id);
        Object.assign(activity, updateActivityDto);
        return this.activitiesRepository.save(activity);
    }

    async remove(id: string): Promise<void> {
        const activity = await this.findOne(id);
        await this.activitiesRepository.remove(activity);
    }
}
