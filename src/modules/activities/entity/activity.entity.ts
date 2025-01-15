
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Parcel } from '../../parcels/entity/parcel.entity';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    type: string; // Type of activity (e.g., planting, irrigation)
    @Column({ type: 'varchar', length: 255 })
    name: string; // Type of activity (e.g., planting, irrigation)

    @Column({ type: 'timestamp' })
    date: Date; // Date of the activity

    @Column({ type: 'float' })
    duration: number; // Duration in hours



    @ManyToOne(() => Parcel, (parcel) => parcel.activities, { onDelete: 'CASCADE' })
    parcel: Parcel; // Many activities belong to one parcel
}