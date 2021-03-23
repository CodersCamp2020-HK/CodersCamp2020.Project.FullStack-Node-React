import React, {useState} from 'react';
import LabeledCheckBox from '../labeledCheckbox/LabeledCheckbox';

interface SingleOption {
    content: string;
    checked: boolean;
}

interface CheckboxGroupProps {
    values: SingleOption[];
    name: string;
}
const CheckboxGroup = ({ values, name }: CheckboxGroupProps) => {
    const [items, setItems] = useState(values);
    //const checkedItems = items.filter((el) => el.checked);

    const handleChange = (content: string) => {
        console.log(content);
        const foundedItemIndex = items.findIndex((item) => item.content == content)
        if(foundedItemIndex > -1) {
            const foundedItem = items[foundedItemIndex];
            const modifiedItems = [...items]
            modifiedItems[foundedItemIndex] = {content: foundedItem.content, checked: !foundedItem.checked}
            setItems(modifiedItems);
        }
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {items.map((el, index) => (
                <LabeledCheckBox key={index} checked={el.checked} name={name} label={el.content} onChange={() => handleChange(el.content)} />
            ))}
        </div>
    );
};

export default CheckboxGroup;
