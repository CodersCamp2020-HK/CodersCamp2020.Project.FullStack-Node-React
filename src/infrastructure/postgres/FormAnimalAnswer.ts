import { Column, Entity, Index, ManyToOne } from 'typeorm';
import FormAnimalSubmission from './FormAnimalSubmission';
import FormQuestion from './FormQuestion';

// export interface JsonAnswer {
//     answer: string;
// }

@Entity('FormAnimalAnswers')
@Index(['submission', 'question'], { unique: true })
export default class FormAnimalAnswer {
    @ManyToOne(() => FormAnimalSubmission, (submission) => submission.answers, { primary: true, nullable: false })
    submission!: FormAnimalSubmission;

    @ManyToOne(() => FormQuestion, (question) => question.animalAnswers, { primary: true, nullable: false })
    question!: FormQuestion;

    @Column()
    answer!: string;
}
