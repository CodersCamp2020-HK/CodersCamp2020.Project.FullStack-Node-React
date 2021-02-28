import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => QuestionnaireQuestion, (question) => question.questionnaire, { cascade: true })
    questions!: QuestionnaireQuestion[];

    // czy auktualna, jaki ma typ, ...
}

// type RequireType<T> = T extends { type: string } ? T : never;

// interface TextAnswer1 {
//     type: 'TextAnswer1';
//     placeholder: string;
// }

// interface EnumAnswer1 {
//     type: 'EnumAnswer';
//     values: string[];
// }

// interface Foo {}

// type Form1 = RequireType<TextAnswer1 | EnumAnswer1 | Foo>;

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
