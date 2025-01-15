
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Parcel } from '../../parcels/entity/parcel.entity';
import { Supply } from './supply.entity';

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
    @ManyToMany(() => Supply, (supply) => supply.activities)
    supplies: Supply[]; // Insumos utilizados en la actividad

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}