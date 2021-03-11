import { SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

type Primitive<T> = T extends Record<string, unknown> ? never : T;

export default class OptionalWhereSelectQueryBuilder<T> {
    constructor(
        public selectQueryBuilder: SelectQueryBuilder<T>,
        private count: number = 0,
        private uuid: string = uuidv4(),
    ) {}

    optAndWhere<P>(condition: string, param: Primitive<P>): OptionalWhereSelectQueryBuilder<T> {
        if (param !== undefined && param !== null) {
            const key = `${this.uuid}_${this.count++}`;
            const query = `${condition} :${key}`;
            this.selectQueryBuilder = this.selectQueryBuilder.andWhere(query, { [key]: param });
        }
        return this;
    }
}
