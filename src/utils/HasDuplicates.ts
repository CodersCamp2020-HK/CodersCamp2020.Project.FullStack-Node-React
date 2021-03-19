import { VolunteerAnswer } from '@application/VolunteerSubmissionsService';

export default function hasDuplicates(array: VolunteerAnswer[]): boolean {
    const values = array.map((item) => item.question);
    return new Set(values).size !== values.length;
}
