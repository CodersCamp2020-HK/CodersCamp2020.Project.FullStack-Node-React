import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Entity, Entity, ManyToOne } from 'typeorm';
import { Animal } from './Animal';
import { Organization } from './Organization';
import { User } from './User';

@Entity()
export class AnimalDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The amount of the animal donation.
     */
    @Column({
        length: 10,
    })
    amount!: number;

    @OneToMany(() => User, (user) => user.animalDonation)
    user!: User[];

    @OneToMany(() => Animal, (animal) => animal.animalDonation)
    animal!: Animal[];
}

@Entity()
export class OrganizationDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The amount of the organization donation.
     */
    @Column({
        length: 10,
    })
    amount!: number;

    @OneToMany(() => User, (user) => user.organizationDonation)
    user!: User[];

    @OneToMany(() => Organization, (organization) => organization.organizatonDonation)
    organization!: Organization[];
}

@Entity()
export class Goal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GoalDonation, (goalDonation) => goalDonation.goal)
    gaolDonation!: GoalDonation;

    /**
     * The amount of the one donation.
     */
    @Column({
        length: 10,
    })
    amount!: number;

    @OneToMany(() => Animal, (animal) => animal.goal, { cascade: true })
    animal!: Animal;
}

@Entity()
export class GoalDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => User, (user) => user.goalDonation)
    user!: User[];

    /**
     * The goal of donation.
     */
    @OneToMany(() => Goal, (goal) => goal.gaolDonation)
    goal!: Goal;

    /**
     * The amount of the one donation.
     */
    @Column({
        length: 10,
    })
    amount!: number;
}
