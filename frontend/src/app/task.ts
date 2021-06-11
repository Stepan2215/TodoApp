export class Task{
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public description: string,
        public dueIn: number ,
        public dueDate?: Date,
        public isDone?: boolean, ) { }
}