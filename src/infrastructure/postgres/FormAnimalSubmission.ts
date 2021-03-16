import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import Animal from './Animal';
import FormAnimalAnswer from './FormAnimalAnswer';
import OrganizationUser from './OrganizationUser';
import User from './User';

export enum AnimalFormStatus {
    IN_PROGRESS = 'in progress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

@Entity('FormAnimalSubmissions')
@Index(['animal', 'applicant', 'adoptionStep'], { unique: true })
export default class FormAnimalSubmission {
    @ManyToOne(() => Animal, (animal) => animal.submissions, { primary: true, nullable: false, onDelete: 'CASCADE' })
    animal!: Animal;

    @ManyToOne(() => User, (user) => user.animalSubmissions, { primary: true, nullable: false, onDelete: 'CASCADE' })
    applicant!: User;

    @ManyToOne(() => AdoptionStep, (step) => step.submissions, { primary: true, nullable: false })
    adoptionStep!: AdoptionStep;

    @Column({ type: 'enum', enum: AnimalFormStatus })
    status!: string;

    @Column({ nullable: true, default: null })
    reason!: string;

    @ManyToOne(() => OrganizationUser, (user) => user.animalReviews, { onDelete: 'CASCADE' })
    reviewer!: OrganizationUser;

    @OneToMany(() => FormAnimalAnswer, (answers) => answers.submission, { cascade: true })
    answers!: FormAnimalAnswer[];

    @CreateDateColumn({ type: 'date' })
    submissionDate!: Date;

    @Column({ type: 'date', nullable: true })
    reviewDate?: Date;
}
