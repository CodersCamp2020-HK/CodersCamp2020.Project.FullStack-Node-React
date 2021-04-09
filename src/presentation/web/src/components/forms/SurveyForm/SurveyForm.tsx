import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormQuestion } from '../../../client/index';
import { FieldValues, useForm, UseFormMethods } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CheckboxGroup from '../../common/checkboxGroup/CheckboxGroup';
import isArray from '../../../utils/IsArray';
import RadioGroup from '../../common/radioGroup/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import isStringOrUndefined from '../../../utils/IsStringOrUndefined';

interface Props {
    questions: FormQuestion[];
    handleSubmit: (data: any) => void;
    defaultValues?: Record<string, string | string[]>;
    disabled?: boolean;
}

interface GenerateInputsProps {
    questions: FormQuestion[];
    methods: UseFormMethods<Record<string, string | string[]>>
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
}))

const GenerateInputs = ({ questions, methods, defaultValues, disabled = false }: GenerateInputsProps) => {
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
    const validateRequired = (value: string | string[]) => value && value.length > 0 || 'Zaznacz odpowiedź';
    
    return questions.map((question, index) => {
        register({ name: `question${question.id}`, type: 'custom'}, { validate: validateRequired })
        if (isArray(question.placeholder.answer)) {
            const radioAnswers: RadioOption[] = [];
            const checkboxAnswers: CheckboxOption[] = [];
            const defaultValue = defaultValues && defaultValues[`question${question.id}`]
            switch (question.placeholder.type) {
                case 'radio':
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

        return (
            <div className={classes.question} key={`question${question.id}`}>
                <Typography>{`${index + 1}. ${question.question}`}</Typography>
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
                    inputRef={register({ required: 'Napisz odpowiedź' })}
                    error={errors.hasOwnProperty(`question${question.id}`)}
                    helperText={errors[`question${question.id}`] && errors[`question${question.id}`]?.message}
                />
            </div>
        );
    })
}

const SurveyForm: React.FC<Props> = ({ questions, handleSubmit: submitCb, defaultValues, disabled }) => {
    const methods = useForm<Record<string, string | string[]>>({
        shouldFocusError: false,
        defaultValues
    });

    return (
        <form noValidate onSubmit={methods.handleSubmit(submitCb)}>
            {GenerateInputs({ questions, methods, defaultValues, disabled })}
            <Button
                size="medium"
                variant="contained"
                hidden={disabled}
                color="primary"
                type="submit">
                    Wyślij formularz
            </Button>
        </form>
    )
}

export default SurveyForm
