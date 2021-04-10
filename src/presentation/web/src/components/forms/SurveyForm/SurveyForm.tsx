import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AdoptionStep, ApiError, FormQuestion } from '../../../client/index';
import { useForm, UseFormMethods } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CheckboxGroup from '../../common/checkboxGroup/CheckboxGroup';
import Grid from '@material-ui/core/Grid';
import isArray from '../../../utils/IsArray';
import RadioGroup from '../../common/radioGroup/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import isStringOrUndefined from '../../../utils/IsStringOrUndefined';
import { UseGetReturn } from 'restful-react';
import { ClassNameMap } from '@material-ui/styles';

interface SurveyFormProps {
    handleSubmit: (data: any) => void;
    formData: UseGetReturn<AdoptionStep, ApiError | Error, void, unknown>;
    defaultValues?: Record<string, string | string[]>;
    disabled?: boolean;
}

interface GenerateInputsProps {
    questions: FormQuestion[];
    methods: UseFormMethods<Record<string, string | string[]>>
    classes: ClassNameMap<"text" | "root" | "question" | "questionError">;
    defaultValues?: Record<string, string | string[]>;
    disabled?: boolean;
}

interface CheckboxOption {
    content: string;
    checked: boolean;
    disabled: boolean;
}

interface RadioOption {
    content: string;
}

interface AnswerForm {
    type: "checkbox" | "radio" | "text";
    answer: string | string[]
}

const useStyles =  makeStyles((theme) => ({
    question: {
        marginBottom: 20,
    },
    root: {
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: 0
        },
        paddingBottom: 24
    },
    questionError: {
        color: theme.palette.error.main,
        ...theme.typography.caption,
        margin: 0,
        marginLeft: 14,
        marginRight: 14,
    },
    text: {
        color: theme.palette.text.disabled
    }
}))

const GenerateInputs = ({ questions, methods, defaultValues, disabled = false, classes }: GenerateInputsProps) => {
    const { register, setValue, errors, trigger, formState } = methods;

    const handleRadioData = (name: string, data: string) => {
        setValue(name, {
            answer: data,
            type: 'radio'
        });
        if (formState.isSubmitted) trigger(name);
    }
    const handleCheckboxData = (name: string, data: CheckboxOption[]): void => {
        const options: string[] = [];
        for (const option of data) options.push(option.content);
        setValue(name, {
            answer: options,
            type: 'checkbox'
        });
        if (formState.isSubmitted) trigger(name);
    }
    const validateRequired = (value: AnswerForm) => value && value.answer.length > 0 || 'Zaznacz odpowiedź';
    const validateRequiredText = (value: AnswerForm) => value && value.answer.length > 0 || 'Napisz odpowiedź';
    
    return questions.map((question, index) => {
        if (isArray(question.placeholder.answer)) {
            const radioAnswers: RadioOption[] = [];
            const checkboxAnswers: CheckboxOption[] = [];
            const defaultValue = defaultValues && defaultValues[`question${question.id}`]
            switch (question.placeholder.type) {
                case 'radio':
                    register({ name: `question${question.id}`, type: 'custom'}, { validate: validateRequired })
                    if (!isStringOrUndefined(defaultValue)) throw new Error('Nie jest stringiem');
                    for (const answer of question.placeholder.answer) radioAnswers.push({ content: answer })
                    return (
                        <div className={classes.question} key={`question${question.id}`}>
                            <RadioGroup
                                key={question.id}
                                name={`question${question.id}`}
                                values={radioAnswers}
                                getCheckedOption={handleRadioData}
                                question={`${index + 1}. ${question.question}`}
                                errors={errors}
                                defaultValue={defaultValue}
                                disabled={disabled}
                            />
                        </div>
                    )
                case 'checkbox':
                    for (const answer of question.placeholder.answer) {
                        register({ name: `question${question.id}`, type: 'custom'}, { validate: validateRequired })
                        isArray(defaultValue) && defaultValue.includes(answer) 
                            ? checkboxAnswers.push({ content: answer, checked: true, disabled: false })
                            : checkboxAnswers.push({ content: answer, checked: false, disabled: false })
                    }
                    return (
                        <div className={classes.question} key={`question${question.id}`}>
                            <CheckboxGroup
                                key={question.id}
                                name={`question${question.id}`}
                                values={checkboxAnswers}
                                getCheckedData={handleCheckboxData}
                                question={`${index + 1}. ${question.question}`}
                                errors={errors}
                                disabled={disabled}
                            />
                        </div>
                    )
                default:
                    throw new Error('Wrong type of question!')
            }
        }

        register({ name: `question${question.id}`, type: 'custom'}, { validate: validateRequiredText })
        return (
            <div className={classes.question} key={`question${question.id}`}>
                <Typography {...(disabled && { className: classes.text })}>{`${index + 1}. ${question.question}`}</Typography>
                <TextField
                    key={question.id}
                    name={`question${question.id}`}
                    multiline
                    required
                    rows={2}
                    rowsMax={4}
                    style={{ marginBottom: 0 }}
                    classes={{ root: classes.root }}
                    disabled={disabled}
                    onChange={(event) => {
                        setValue(`question${question.id}`, {
                            answer: event.target.value,
                            type: 'text'
                        });
                        if (formState.isSubmitted) trigger(`question${question.id}`);
                    }}
                    error={errors.hasOwnProperty(`question${question.id}`)}
                    helperText={errors[`question${question.id}`] && errors[`question${question.id}`]?.message}
                />
            </div>
        );
    })
}

const SurveyForm: React.FC<SurveyFormProps> = ({ handleSubmit: submitCb, formData, defaultValues, disabled }) => {
    const { data, loading, error } = formData;
    const classes = useStyles();

    const methods = useForm<Record<string, string | string[]>>({
        shouldFocusError: false,
        defaultValues
    });

    if (!loading && data && data.form) {
        return (
            <Grid item sm={12} lg={8}>
                <form noValidate onSubmit={methods.handleSubmit(submitCb)}>
                    {GenerateInputs({ questions: data.form.questions, methods, defaultValues, disabled, classes })}
                    {
                        !disabled &&
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            type="submit">
                                Wyślij formularz
                        </Button>
                    }
                </form>
            </Grid>
        )
    }
    if (error) {
        const message = error.message;
        return (
            <div>
                <p>{message}</p>
            </div>
        )
    }
    return (
        <div>
            loading...
        </div>
    )
}

export default SurveyForm