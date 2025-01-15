
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Parcel } from '../../parcels/entity/parcel.entity';

@Entity()

export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    type: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'float' })
    duration: number;
    @ManyToOne(() => Parcel, (parcel) => parcel.activities, { onDelete: 'CASCADE' })
    parcel: Parcel;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}