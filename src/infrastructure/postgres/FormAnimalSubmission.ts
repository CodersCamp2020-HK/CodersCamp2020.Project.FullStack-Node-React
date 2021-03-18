import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
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
@Index(['animal', 'applicant', 'adoptionStep'], { unique: true })
export default class FormAnimalSubmission {
    @ManyToOne(() => Animal, (animal) => animal.submissions, { primary: true, nullable: false })
    animal!: Animal;

    @ManyToOne(() => User, (user) => user.animalSubmissions, { primary: true, nullable: false })
    applicant!: User;

    @ManyToOne(() => AdoptionStep, (step) => step.submissions, { primary: true, nullable: false })
    adoptionStep!: AdoptionStep;

    @Column({ type: 'enum', enum: AnimalFormStatus })
    status!: string;

    @Length(3, 300)
    @Column({ nullable: true, default: null })
    reason!: string;

    @ManyToOne(() => OrganizationUser, (user) => user.animalReviews)
    reviewer!: OrganizationUser;

    @OneToMany(() => FormAnimalAnswer, (answers) => answers.submission, { cascade: true })
    answers!: FormAnimalAnswer[];

    @IsDate()
    @CreateDateColumn()
    submissionDate!: Date;

    @IsDate()
    @Column({ nullable: true })
    reviewDate?: Date;
}
