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
                    { content: 'asd', checked: false },
                    { content: 'qwe', checked: true },
                    { content: 'zxc', checked: true },
                    { content: 'tyu', checked: false },
                ]}
                name="animalGroup"
                getCheckedData={handleData}
            />
            <br />
            <CheckBoxGroup
                values={[
                    { content: 'hgfd', checked: true },
                    { content: 'qpoiwe', checked: false },
                    { content: 'mnbjrt', checked: false },
                    { content: 'yred', checked: false },
                ]}
                name="personGroup"
                getCheckedData={handleData}
            />
            <button onClick={() => console.log(data)}>Pobierz zaznaczone dane</button>
        </div>
    );
};
export default CheckBoxGroupExample;
