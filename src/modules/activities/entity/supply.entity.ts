import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Supply {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;
    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'float' })
    quantity: number;

    @ManyToMany(() => Activity, (activity) => activity.supplies)
    @JoinTable()
    activities: Activity[]
}
