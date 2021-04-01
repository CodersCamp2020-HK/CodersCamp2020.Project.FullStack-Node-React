import React from 'react'
import { FormQuestion, AnswerType } from '../../client/index';

interface Props {
    questions: FormQuestion[];
}

const Form: React.FC<Props> = ({ questions }) => {
    return (
        <div>
            {questions.map((question) => {
                console.log(question.placeholder)
            })}
        </div>
    )
}

export default Form
