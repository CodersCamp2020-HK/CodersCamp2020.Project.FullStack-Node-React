import React, { useState } from 'react'
import isArray from '../../utils/IsArray';
import { FormQuestion } from '../../client/index';
import RadioGroup from '../common/radioGroup/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckboxGroup from '../common/checkboxGroup/CheckboxGroup';

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

const handleRadioData = (name: string, data: string) => {
    console.log(name, data)
}

const handleCheckboxData = (name: string, data: CheckboxOption[]): void => {
    console.log(name, data)
}

const generateInput = (questions: FormQuestion[]) => {
    return questions.map((question) => {
        if (isArray(question.placeholder.answer)) {
            const radioAnswers: RadioOption[] = []
            const checkboxAnswers: CheckboxOption[] = []
            switch (question.placeholder.type) {
                case 'radio':
                    for (const answer of question.placeholder.answer) radioAnswers.push({ content: answer })
                    return (
                        <div key={`question${question.id}`}>
                            <Typography>{question.question}</Typography>
                            <RadioGroup key={question.id} name={question.id.toString()} values={radioAnswers} getCheckedOption={handleRadioData} />
                        </div>
                    )
                case 'checkbox':
                    console.log('Checkbox');
                    for (const answer of question.placeholder.answer) checkboxAnswers.push({ content: answer, checked: false, disabled: false })
                    return (
                        <div key={`question${question.id}`}>
                            <Typography>{question.question}</Typography>
                            <CheckboxGroup key={question.id} name={question.id.toString()} values={checkboxAnswers} getCheckedData={handleCheckboxData} />
                        </div>
                    )
                default:
                    throw new Error('Wrong type of question!')
            }
        }
        return (
            <div key={`question${question.id}`}>
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
