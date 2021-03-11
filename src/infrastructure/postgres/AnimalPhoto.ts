import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Animal from './Animal';

@Entity('AnimalPhotos')
export default class AnimalPhoto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'bytea' })
    photo!: string;

    @ManyToOne(() => Animal, (animal) => animal.photos)
    animal!: Animal;
}
