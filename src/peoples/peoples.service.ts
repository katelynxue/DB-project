import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {People} from './people.model';

@Injectable()
export class PeoplesService {
    private peoples: People [] = [];

    constructor(@InjectModel('People') private readonly peopleModel: Model<People>) {}

    async insertPeople(name: string, job: string, desc: string, hours: number, salary: number) {
        const newPeople = new this.peopleModel({
            name, 
            job, 
            description: desc, 
            hours, 
            salary,
        });
        const result = await newPeople.save();
        return result.id as string;
    }

    getPeoples() {
        return [...this.peoples];
    }

    getSinglePeople(peopleId: string) {
        const people = this.findPeople(peopleId)[0];
        return {...people};
    }

    updatePeople(peopleId: string, name: string, job: string, description: string, hours: number, salary: number) {
        const [people, index] = this.findPeople(peopleId);
        const updatedpeople = {...people};
        if(name) {
            updatedpeople.name = name;
        }
        if(job) {
            updatedpeople.job = job;
        }
        if(description) {
            updatedpeople.description = description;
        }
        if(hours) {
            updatedpeople.hours = hours;
        }
        if(salary) {
            updatedpeople.salary = salary;
        }
        this.peoples[index] = updatedpeople;
    }

    deletePeople(peopleId: string) {
        const index = this.findPeople(peopleId)[1];
        this.peoples.splice(index, 1);
    }

    private findPeople(id: string): [People, number] {
        const peopleIndex = this.peoples.findIndex((people) => people.id === id);
        const people = this.peoples[peopleIndex];
        if (!people) {
            throw new NotFoundException('Could not find people');
        }
        return [people, peopleIndex];
    }

}