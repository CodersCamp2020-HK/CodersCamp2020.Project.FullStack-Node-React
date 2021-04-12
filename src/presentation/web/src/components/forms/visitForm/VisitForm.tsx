import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { format, set as updateDate } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateVisit } from '../../../client/index';
import Calendar from '../../calendar/Calendar';
import TimePicker from '../../timePicker/TimePicker';

const POSSIBLE_TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

interface VisitFormProps {
    animalId: number;
}

interface VisitData {
    date: Date | undefined;
    time: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        marginTop: theme.spacing(2),
    },
}));

const VisitForm = ({ animalId }: VisitFormProps) => {
    const styles = useStyles();
    const [selected, setSelected] = useState<VisitData>({
        date: undefined,
        time: undefined,
    });
    const { errors, setValue, register, handleSubmit } = useForm<VisitData>({ mode: 'all' });
    const { mutate: createVisit } = useCreateVisit({});
    const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

    const handleDate = (date: Date) => {
        setSelected((previous) => ({ ...previous, date }));
        setValue('date', date);
    };

    const handleTime = (time: string) => {
        setSelected((previous) => ({ ...previous, time }));
        setValue('time', time);
    };

    const sendForm = async (data: VisitData) => {
        if (data.date && data.time) {
            const hours = Number(data.time.slice(0, 2));
            const minutes = Number(data.time.slice(3));
            const selectedDate = updateDate(data.date, {
                hours,
                minutes,
            });
            const requestBody = {
                date: selectedDate.toISOString(),
                animalId,
                userId: 1,
            }
            try {
                await createVisit(requestBody, {
                    headers: [['content-type', 'application/json'],['access_token', localStorage.getItem('apiKey') as string]]
                })
            } catch(e) {
                if(e.status == 400 || e.status == 401) {
                    setServerErrorMessage('Brak uprawnień!');
                }
                else if(e.status == 404) {
                    setServerErrorMessage('Nie znaleziono zwierzęcia!');
                }
                else {
                    setServerErrorMessage('Błąd serwera! Spróbuj ponownie poźniej');
                }
            }
        }
    };

    const showError = () => {
        if (errors.date && errors.time) {
            return 'Data i czas są wymagane';
        }

        if (errors.date) {
            return errors.date.message;
        }

        if (errors.time) {
            return errors.time.message;
        }

        return '';
    };

    const showSelectedDate = () => {
        const formatedDate = format(selected.date as Date, 'dd/MM/yyyy');
        return `Wybrana data: ${formatedDate}, ${selected.time}`;
    };

    register({ name: 'date', type: 'custom' }, { required: 'Data jest wymagana!' });
    register({ name: 'time', type: 'custom' }, { required: 'Czas jest wymagany!' });

    return (
        <form className={styles.form} onSubmit={handleSubmit(sendForm)}>
            <Calendar name="date" getSelectedDate={handleDate} />
            <TimePicker name="time" times={POSSIBLE_TIMES} getSelectedTime={handleTime} />
            <Typography variant="subtitle1">{selected.date && selected.time && showSelectedDate()}</Typography>
            <Typography variant="subtitle1" color="error">
                {(!selected.date || !selected.time) && showError()}
            </Typography>
            <Typography variant="subtitle1" color="error">
                {serverErrorMessage !== '' && serverErrorMessage}
            </Typography>
            <Button className={styles.submit} variant="contained" color="primary" size="large" type="submit">
                Potwierdź datę spotkania
            </Button>
        </form>
    );
};

export default VisitForm;
