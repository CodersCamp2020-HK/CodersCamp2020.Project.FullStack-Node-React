import { Column, Entity, Index, ManyToOne } from 'typeorm';
import Animal from './Animal';
import OrganizationUser from './OrganizationUser';
import { Length } from 'class-validator';

@Entity('AnimalsHandler')
@Index(['organizationUser', 'animal'], { unique: true })
export default class AnimalHandler {
    @ManyToOne(() => OrganizationUser, (user) => user.caregivers, { primary: true, nullable: false })
    organizationUser!: OrganizationUser;

    @ManyToOne(() => Animal, (animal) => animal.animalsHandlers, { primary: true, nullable: false })
    animal!: Animal;

    @Length(3, 100)
    @Column()
    role!: string;
}
