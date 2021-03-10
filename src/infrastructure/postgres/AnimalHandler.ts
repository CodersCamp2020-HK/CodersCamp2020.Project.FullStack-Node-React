import { Column, Entity, Index, ManyToOne } from 'typeorm';
import Animal from './Animal';
import OrganizationUser from './OrganizationUser';

@Entity('AnimalsHandler')
@Index(['organizationUser', 'animal'], { unique: true })
export default class AnimalHandler {
    @ManyToOne(() => OrganizationUser, (user) => user.caregivers, { primary: true, nullable: false })
    organizationUser!: OrganizationUser;

    @ManyToOne(() => Animal, (animal) => animal.animalsHandler, { primary: true, nullable: false })
    animal!: Animal;

    @Column()
    role!: string;
}
