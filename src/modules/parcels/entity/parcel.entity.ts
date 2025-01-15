// entities/parcel.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Activity } from '../../activities/entity/activity.entity';
@Entity()
export class Parcel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    location: string;

    @Column({ type: 'float' })
    latitude: number;

    @Column({ type: 'float' })
    longitude: number;

    @Column({ type: 'float' })
    size: number; // Size in hectares or square meters

    @Column({ type: 'varchar', length: 255, nullable: true })
    cropType?: string; // Optional

    @OneToMany(() => Activity, (activity) => activity.parcel)
    activities: Activity[];
}
