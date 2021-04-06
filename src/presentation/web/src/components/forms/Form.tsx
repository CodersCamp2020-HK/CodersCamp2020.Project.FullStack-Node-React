import React from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { makeStyles } from '@material-ui/core/styles';
import { FormQuestion } from '../../client/index';
import { FieldValues, useForm, UseFormMethods } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CheckboxGroup from '../common/checkboxGroup/CheckboxGroup';
import isArray from '../../utils/IsArray';
import RadioGroup from '../common/radioGroup/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

const useStyles =  makeStyles((theme) => ({
    question: {
        marginBottom: 20,
    },
    root: {
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            top: 77
        }
    },
    questionError: {
        color: theme.palette.error.main,
        ...theme.typography.caption,
        margin: 0,
        marginLeft: 14,
        marginRight: 14,
    },
    submit: {
        marginTop: 25
    }
}))

const GenerateInputs = (questions: FormQuestion[], methods: UseFormMethods<FieldValues>) => {
    const classes = useStyles();
    const { register, setValue, errors, trigger, formState } = methods;
    const handleRadioData = (name: string, data: string) => {
        setValue(name, data);
        if (formState.isSubmitted) trigger(name);
    }
    const handleCheckboxData = (name: string, data: CheckboxOption[]): void => {
        const options = [];
        for (const option of data) options.push(option.content);
        setValue(name, options);
        if (formState.isSubmitted) trigger(name);
    }
    const validateRequired = (value: string | string[]) => value && value.length > 0 || 'Pole jest wymagane';
    
    return questions.map((question) => {
        register({ name: `question${question.id}`, type: 'custom'}, { validate: validateRequired })
        if (isArray(question.placeholder.answer)) {
            const radioAnswers: RadioOption[] = []
            const checkboxAnswers: CheckboxOption[] = []
            switch (question.placeholder.type) {
                case 'radio':
                    for (const answer of question.placeholder.answer) radioAnswers.push({ content: answer })
                    return (
                        <div className={classes.question} key={`question${question.id}`}>
                            <Typography>{question.question}</Typography>
                            <RadioGroup
                                key={question.id}
                                name={`question${question.id}`}
                                values={radioAnswers}
                                getCheckedOption={handleRadioData}
                            />
                            <ErrorMessage
                                errors={errors}
                                name={`question${question.id}`}
                                render={({ message }) => <p className={classes.questionError}>{message}</p>}
                            />
                        </div>
                    )
                case 'checkbox':
                    for (const answer of question.placeholder.answer) checkboxAnswers.push({ content: answer, checked: false, disabled: false })
                    return (
                        <div className={classes.question} key={`question${question.id}`}>
                            <Typography>{question.question}</Typography>
                            <CheckboxGroup
                                key={question.id}
                                name={`question${question.id}`}
                                values={checkboxAnswers}
                                getCheckedData={handleCheckboxData}
                            />
                            <ErrorMessage
                                errors={errors}
                                name={`question${question.id}`}
                                render={({ message }) => <p className={classes.questionError}>{message}</p>}
                            />
                        </div>
                    )
                default:
                    throw new Error('Wrong type of question!')
            }
        }
        return (
            <div className={classes.question} key={`question${question.id}`}>
                <Typography>{question.question}</Typography>
                <TextField
                    key={question.id}
                    name={`question${question.id}`}
                    multiline
                    rows={2}
                    rowsMax={4}
                    style={{ marginBottom: 0 }}
                    classes={{
                        root: classes.root
                    }}
                    inputRef={register({ required: 'Pole jest wymagane'})}
                    error={errors.hasOwnProperty(`question${question.id}`)}
                    helperText={errors[`question${question.id}`] && errors[`question${question.id}`].message}
                />
            </div>
        );
    })
}

const Form: React.FC<Props> = ({ questions, handleSubmit: submitCb }) => {
    const methods = useForm();
    const classes = useStyles();

    return (
        <form noValidate onSubmit={methods.handleSubmit(submitCb)}>
            {GenerateInputs(questions, methods)}
            <Button
                className={classes.submit}
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
