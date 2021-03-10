import { Column, Entity, ManyToOne } from 'typeorm';
import Animal from './Animal';
import OrganizationUser from './OrganizationUser';

@Entity('AnimalsHandler')
export default class AnimalHandler {
    @ManyToOne(() => OrganizationUser, (user) => user.caregivers)
    organizationUser!: OrganizationUser;

    @ManyToOne(() => Animal, (animal) => animal.animalsHandler)
    animal!: Animal;

    @Column()
    role!: string;
}
