import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import FormQuestion from './FormQuestion';
import VolunteerHireStep from './VolunteerHireStep';

@Entity('Forms')
export default class Questionnaire {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => FormQuestion, (question) => question.form, { cascade: true })
    questions!: FormQuestion[];

    @OneToMany(() => AdoptionStep, (adoption) => adoption.form, { cascade: true })
    adoptionSteps!: AdoptionStep[];

    @OneToMany(() => VolunteerHireStep, (step) => step.form, { cascade: true })
    volunteerHireSteps!: VolunteerHireStep[];
}
