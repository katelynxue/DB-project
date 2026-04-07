import * as mongoose from 'mongoose';

export const PeopleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    job: { type: String, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: true },
    salary: { type: Number, required: true },
});


export interface People {
    id: string;
    name: string; 
    job: string;
    description: string;
    hours: number;
    salary: number;
}