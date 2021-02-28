import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class VolunteerQuestionnaire {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    a1!: string;
}
