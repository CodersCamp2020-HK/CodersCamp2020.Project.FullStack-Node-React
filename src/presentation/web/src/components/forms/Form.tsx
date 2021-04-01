import React, { useState } from 'react'
import isArray from '../../utils/IsArray';
import { FormQuestion } from '../../client/index';
import RadioGroup from '../common/radioGroup/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface Props {
    questions: FormQuestion[];
}

interface CheckboxOption {
    content: string;
    checked: boolean;
    disabled: boolean;
}
interface RadioOption {
    content: string;
}

interface FormData {
    [key: string]: Array<CheckboxOption | RadioOption>;
}

const handleData = (name: string, data: string | CheckboxOption[]) => {
    console.log(name, data)
}

const generateInput = (questions: FormQuestion[]) => {
    return questions.map((question) => {
        if (isArray(question.placeholder.answer)) {
            const answers: Array<CheckboxOption | RadioOption> = []
            switch (question.placeholder.type) {
                case 'radio':
                    for (const answer of question.placeholder.answer) answers.push({ content: answer })
                    console.log(answers)
                    return (
                        <div>
                            <Typography>{question.question}</Typography>
                            <RadioGroup key={question.id} name={question.id.toString()} values={answers} getCheckedOption={handleData} />
                        </div>
                    )
            }
        }
        return (
            <div>
                <Typography>{question.question}</Typography>
                <TextField key={question.id} name={question.id.toString()} multiline rows={2} rowsMax={4} />
            </div>
        );
    })
}

const Form: React.FC<Props> = ({ questions }) => {
    return (
        <div>
            {generateInput(questions)}
        </div>
    )
}

export default Form
