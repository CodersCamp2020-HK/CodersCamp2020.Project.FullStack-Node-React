import React, { useState } from 'react';
import CheckBoxGroup, { SingleOption } from './CheckboxGroup';
const CheckBoxGroupExample = () => {
    interface gettedData {
        [key: string]: SingleOption[];
    }

    const [data, setData] = useState<gettedData>({});

    const handleData = (name: string, givenData: SingleOption[]): void => {
        setData((previousState) => { return { ...previousState, [name]: givenData }});
    };

    return (
        <div>
            <CheckBoxGroup
                values={[
                    { content: 'asd', checked: false, disabled: false },
                    { content: 'qwe', checked: true, disabled: true },
                    { content: 'zxc', checked: true, disabled: false},
                    { content: 'tyu', checked: false, disabled: true },
                ]}
                name="animalGroup"
                getCheckedData={handleData}
            />
            <br />
            <CheckBoxGroup
                values={[
                    { content: 'hgfd', checked: true, disabled: false},
                    { content: 'qpoiwe', checked: false, disabled: true },
                    { content: 'mnbjrt', checked: false, disabled: false},
                    { content: 'yred', checked: false, disabled: false},
                ]}
                name="personGroup"
                getCheckedData={handleData}
            />
            <button onClick={() => console.log(data)}>Pobierz zaznaczone dane</button>
        </div>
    );
};
export default CheckBoxGroupExample;
