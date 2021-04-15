import { FormAnimalAnswer } from "../client";

const mapAnswersToQuestions = (answers: FormAnimalAnswer[]) => {
    const answeredQuestion: Record<string, string | string[]> = {};
    answers.forEach((answer) => answeredQuestion[`question${answer.question.id}`] = answer.answer.answer)

    return answeredQuestion
}

export default mapAnswersToQuestions;