import React from 'react'
import isArray from '../../utils/IsArray';
import { AnswerType, FormQuestion } from '../../client/index';
import { FieldValues, useForm, UseFormMethods } from 'react-hook-form';
import RadioGroup from '../common/radioGroup/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckboxGroup from '../common/checkboxGroup/CheckboxGroup';
import Button from '@material-ui/core/Button';
import { ErrorMessage } from '@hookform/error-message';

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
    const { register, setValue, errors, trigger, formState } = methods;
    const handleRadioData = (name: string, data: string) => {
        setValue(name, data);
    }
    const handleCheckboxData = (name: string, data: CheckboxOption[]): void => {
        const options = [];
        for (const option of data) options.push(option.content);
        setValue(name, options);
        if (formState.isSubmitted) trigger(name);
    }
    const validateRequired = (value: string | string[]) => value && value.length > 0 || 'Pole jest wymagane';
    console.log(errors)
    
    return questions.map((question) => {
        register({ name: `question${question.id}`, type: 'custom'}, { validate: validateRequired })
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
                            <ErrorMessage errors={errors} name={`question${question.id}`} />
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
                            <ErrorMessage errors={errors} name={`question${question.id}`}  />
                            {/* {errors[`question${question.id}`]?.message} */}
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
                    inputRef={register({ required: 'Pole jest wymagane'})}
                />
                <ErrorMessage errors={errors} name={`question${question.id}`} />
                {/* {errors[`question${question.id}`]?.message} */}
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
