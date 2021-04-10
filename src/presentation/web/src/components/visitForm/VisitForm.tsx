import { set as updateDate } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateVisit } from '../../client/index';
import Calendar from '../calendar/Calendar';
import TimePicker from '../timePicker/TimePicker';

const POSSIBLE_TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

interface VisitFormProps {
    animalId: number;
}

interface VisitData {
    date: Date | undefined;
    time: string | undefined;
}

const VisitForm = ({ animalId }: VisitFormProps) => {
    const [selected, setSelected] = useState<VisitData>({
        date: undefined,
        time: undefined,
    });
    const { errors, setValue, register, handleSubmit } = useForm<VisitData>({ mode: 'all' });
    const { mutate: createVisit } = useCreateVisit({});

    const handleDate = (date: Date) => {
        setSelected((previous) => ({ ...previous, date }));
        setValue('date', date);
    };

    const handleTime = (time: string) => {
        setSelected((previous) => ({ ...previous, time }));
        setValue('time', time);
    };

    const sendForm = (data: VisitData) => {
        if (data.date && data.time) {
            const hours = Number(data.time.slice(0, 2));
            const minutes = Number(data.time.slice(3));
            const selectedDate = updateDate(data.date, {
                hours,
                minutes,
            });
            try {
                createVisit({
                    animalId,
                    userId: 1,
                    date: selectedDate.toDateString(),
                });
            } catch {
                console.log('Brak polaczenia');
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

    register({ name: 'date', type: 'custom' }, { required: 'Data jest wymagana!' });
    register({ name: 'time', type: 'custom' }, { required: 'Czas jest wymagany!' });
    return (
        <form onSubmit={handleSubmit(sendForm)}>
            <Calendar name="date" getSelectedDate={handleDate} />
            <TimePicker name="time" times={POSSIBLE_TIMES} getSelectedTime={handleTime} />
            {selected.date && selected.time && 'Wybrano czas i date'}
            {(!selected.date || !selected.time) && showError()}
            <input type="submit" value="Wyślij" />
        </form>
    );
};

export default VisitForm;
