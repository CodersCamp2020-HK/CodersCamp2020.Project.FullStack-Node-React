import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import Animal from './Animal';
import FormAnimalAnswer from './FormAnimalAnswer';
import OrganizationUser from './OrganizationUser';
import User from './User';
import { IsDate, Length } from 'class-validator';

export enum AnimalFormStatus {
    IN_PROGRESS = 'in progress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

@Entity('FormAnimalSubmissions')
@Index(['applicant', 'adoptionStep.number'], { unique: true })
export default class FormAnimalSubmission {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Animal, (animal) => animal.submissions, { nullable: false })
    animal!: Animal;

    @ManyToOne(() => User, (user) => user.animalSubmissions, { nullable: false })
    applicant!: User;

    @ManyToOne(() => AdoptionStep, (step) => step.submissions, { nullable: false })
    adoptionStep!: AdoptionStep;

    @Column({ type: 'enum', enum: AnimalFormStatus, default: AnimalFormStatus.IN_PROGRESS })
    status?: string;

    @Length(3, 300)
    @Column({ nullable: true, default: null })
    reason?: string;

    @ManyToOne(() => OrganizationUser, (user) => user.animalReviews, { nullable: true })
    reviewer?: OrganizationUser;

    @OneToMany(() => FormAnimalAnswer, (answers) => answers.submission)
    answers!: FormAnimalAnswer[];

    @IsDate()
    @CreateDateColumn()
    submissionDate!: Date;

    @IsDate()
    @Column({ nullable: true })
    reviewDate?: Date;
}
