import { Injectable, NotFoundException } from '@nestjs/common';
import { Parcel } from './entity/parcel.entity';
import { CreateParcelDto } from './dto/parcels.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParcelsService {
    constructor(
        @InjectRepository(Parcel)
        private readonly parcelsRepository: Repository<Parcel>,
    ) { }

    async create(createParcelDto: CreateParcelDto): Promise<Parcel> {
        const parcel = this.parcelsRepository.create(createParcelDto);
        return this.parcelsRepository.save(parcel);
    }

    async findAll(): Promise<Parcel[]> {
        return this.parcelsRepository.find();
    }

    async findOne(id: string): Promise<Parcel> {
        const parcel = await this.parcelsRepository.findOne({ where: { id } });
        if (!parcel) {
            throw new NotFoundException(`Parcel with ID ${id} not found`);
        }
        return parcel;
    }

    async update(id: string, updateParcelDto: Partial<CreateParcelDto>): Promise<Parcel> {
        const parcel = await this.findOne(id);
        Object.assign(parcel, updateParcelDto);
        return this.parcelsRepository.save(parcel);
    }

    async remove(id: string): Promise<void> {
        const parcel = await this.findOne(id);
        await this.parcelsRepository.remove(parcel);
    }
}
