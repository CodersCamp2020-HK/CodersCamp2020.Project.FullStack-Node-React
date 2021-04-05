import React from 'react'
import isArray from '../../utils/IsArray';
import { AnswerType, FormQuestion } from '../../client/index';
import { FieldValues, useForm, UseFormMethods } from 'react-hook-form';
import RadioGroup from '../common/radioGroup/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckboxGroup from '../common/checkboxGroup/CheckboxGroup';
import Button from '@material-ui/core/Button';

interface Props {
    questions: FormQuestion[];
    handleSubmit: (data: any) => void;
}

interface CheckboxOption {
    content: string;
    checked: boolean;
    disabled: boolean;
}
interface RadioOption {
    content: string;
}

interface Answer {
    type: AnswerType;
    answer: string | string[];
}

interface FormData {
    questionId: number;
    answer: Answer;
}


const generateInputs = (questions: FormQuestion[], methods: UseFormMethods<FieldValues>) => {
    const { register, setValue, errors, setError } = methods;
    const handleRadioData = (name: string, data: string) => {
        setValue(name, data);
    }
    const handleCheckboxData = (name: string, data: CheckboxOption[]): void => {
        const options = [];
        for (const option of data) options.push(option.content);
        setValue(name, options);
    }
    
    return questions.map((question) => {
        register({ name: `question${question.id}`, type: 'custom'})
        if (isArray(question.placeholder.answer)) {
            const radioAnswers: RadioOption[] = []
            const checkboxAnswers: CheckboxOption[] = []
            switch (question.placeholder.type) {
                case 'radio':
                    for (const answer of question.placeholder.answer) radioAnswers.push({ content: answer })
                    return (
                        <div key={`question${question.id}`}>
                            <Typography>{question.question}</Typography>
                            <RadioGroup
                                key={question.id}
                                name={`question${question.id}`}
                                values={radioAnswers}
                                getCheckedOption={handleRadioData}
                            />
                        </div>
                    )
                case 'checkbox':
                    for (const answer of question.placeholder.answer) checkboxAnswers.push({ content: answer, checked: false, disabled: false })
                    return (
                        <div key={`question${question.id}`}>
                            <Typography>{question.question}</Typography>
                            <CheckboxGroup
                                key={question.id}
                                name={`question${question.id}`}
                                values={checkboxAnswers}
                                getCheckedData={handleCheckboxData}
                            />
                        </div>
                    )
                default:
                    throw new Error('Wrong type of question!')
            }
        }
        return (
            <div key={`question${question.id}`}>
                <Typography>{question.question}</Typography>
                <TextField
                    key={question.id}
                    name={`question${question.id}`}
                    multiline
                    rows={2}
                    rowsMax={4}
                />
            </div>
        );
    })
}

const Form: React.FC<Props> = ({ questions, handleSubmit: submitCb }) => {
    const methods = useForm();

    return (
        <form noValidate onSubmit={methods.handleSubmit(submitCb)}>
            {generateInputs(questions, methods)}
            <Button
                fullWidth
                size="medium"
                variant="contained"
                color="primary"
                type="submit">
                    Wyślij formularz
            </Button>
        </form>
    )
}

export default Form
