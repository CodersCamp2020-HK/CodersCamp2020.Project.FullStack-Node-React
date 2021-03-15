import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import FormQuestion from './FormQuestion';
import VolunteerHireStep from './VolunteerHireStep';

@Entity('Forms')
export default class Form {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => FormQuestion, (question) => question.form, { cascade: true })
    questions!: FormQuestion[];

    @OneToMany(() => AdoptionStep, (adoption) => adoption.form)
    adoptionSteps!: AdoptionStep[];

    @OneToMany(() => VolunteerHireStep, (step) => step.form)
    volunteerHireSteps!: VolunteerHireStep[];
}
