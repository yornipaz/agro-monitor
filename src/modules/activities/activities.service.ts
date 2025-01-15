import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from './entity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/activity.dto';
import { Supply } from './entity/supply.entity';
import { Parcel } from '../parcels/entity/parcel.entity';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
        @InjectRepository(Parcel)
        private readonly parcelRepository: Repository<Parcel>,
        @InjectRepository(Supply)
        private readonly supplyRepository: Repository<Supply>,
    ) { }

    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
        const { type, name, date, duration, parcelId, supplies } = createActivityDto;

        // Fetch the related parcel
        const parcel = await this.parcelRepository.findOneOrFail({ where: { id: parcelId } });

        // Save the supplies in the database
        const savedSupplies = await Promise.all(
            supplies.map((supply) =>
                this.supplyRepository.save(this.supplyRepository.create(supply)),
            ),
        );

        // Create and save the activity
        const activity = this.activityRepository.create({
            type,
            name,
            date,
            duration,
            parcel,
            supplies: savedSupplies,
        });

        return this.activityRepository.save(activity);
    }

    async findAll(): Promise<Activity[]> {
        return this.activityRepository.find({ relations: ['parcel'] });
    }

    async findOne(id: string): Promise<Activity> {
        const activity = await this.activityRepository.findOne({
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
        return this.activityRepository.save(activity);
    }

    async remove(id: string): Promise<void> {
        const activity = await this.findOne(id);
        await this.activityRepository.remove(activity);
    }
}
