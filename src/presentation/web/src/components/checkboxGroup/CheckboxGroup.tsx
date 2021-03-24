import React, { useEffect, useState } from 'react';
import LabeledCheckBox from '../labeledCheckbox/LabeledCheckbox';

export interface SingleOption {
    content: string;
    checked: boolean;
    disabled: boolean;
}

interface CheckboxGroupProps {
    values: SingleOption[];
    name: string;
    getCheckedData: (name: string, data: SingleOption[]) => void;
}
const CheckboxGroup = ({ values, name, getCheckedData }: CheckboxGroupProps) => {
    const [items, setItems] = useState(values);

    useEffect(() => {
        getCheckedData(
            name,
            values.filter((el) => el.checked),
        );
    }, []);

    useEffect(() => {
        getCheckedData(
            name,
            items.filter((el) => el.checked),
        );
    }, [items]);

    const handleChange = (content: string) => {
        const foundedItemIndex = items.findIndex((item) => item.content == content);
        if (foundedItemIndex > -1) {
            const foundedItem = items[foundedItemIndex];
            const modifiedItems = [...items];
            modifiedItems[foundedItemIndex] = { content: foundedItem.content, checked: !foundedItem.checked, disabled: foundedItem.disabled };
            setItems(modifiedItems);
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((el, index) => (
                <LabeledCheckBox
                    key={index}
                    checked={el.checked}
                    disabled={el.disabled}
                    name={name}
                    label={el.content}
                    onChange={() => handleChange(el.content)}
                />
            ))}
        </div>
    );
};

export default CheckboxGroup;
