import React from 'react'
import { FormQuestion, AnswerType } from '../../client/index';
import RadioGroup from '../common/radioGroup/RadioGroup';

interface Props {
    questions: FormQuestion[];
}

const Form: React.FC<Props> = ({ questions }) => {
    return (
        <div>
            {questions.map((question) => {
                console.log(question.placeholder.answer)
                // switch (question.placeholder.type) {
                //     case 'radio':
                //         return <RadioGroup values={question.placeholder.answer} name={question.id.toString()} getCheckedOption={} />
                
                //     default:
                //         break;
                // }
            })}
        </div>
    )
}

export default Form
