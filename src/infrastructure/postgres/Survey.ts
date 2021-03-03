import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => QuestionnaireQuestion, (question) => question.questionnaire, { cascade: true })
    questions!: QuestionnaireQuestion[];
}

interface TextAnswer {
    placeholder: string;
}

interface EnumAnswer {
    values: string[];
}

type FormType = 'TextAnswer' | 'EnumAnswer';

interface Form {
    type: FormType;
    data: TextAnswer | EnumAnswer;
}

@Entity()
export class QuestionnaireQuestion {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
    questionnaire!: Questionnaire;

    @Column()
    question!: string;

    @Column({
        type: 'jsonb',
    })
    form!: Form;
}
