import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnimalAdditionalInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    temporary_home!: boolean;

    @Column()
    need_donations!: boolean;

    @Column()
    virtual_adoption!: boolean;

    @Column({
        type: 'date',
    })
    adoption_date!: Date;

    @Column({
        type: 'date',
    })
    admission_to_shelter!: Date;

    @Column()
    accepts_kids!: boolean;

    @Column()
    accepts_other_animals!: boolean;
}
