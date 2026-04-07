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

    async getPeoples() {
        const peoples = await this.peopleModel.find().exec();
        return peoples.map((people) => ({
            id: people.id, 
            name: people.name, 
            job: people.job, 
            description: people.description, 
            hours: people.hours, 
            salary: people.salary,
        }));
    }

    async getSinglePeople(peopleId: string) {
        const people = await this.findPeople(peopleId);
        return {
            id: people.id, 
            name: people.name, 
            job: people.job, 
            description: people.description, 
            hours: people.hours, 
            salary: people.salary,
        };
    }

    async updatePeople(peopleId: string, name: string, job: string, description: string, hours: number, salary: number) {
        const updatedPeople = await this.findPeople(peopleId);
        if(name) {
            updatedPeople.name = name;
        }
        if(job) {
            updatedPeople.job = job;
        }
        if(description) {
            updatedPeople.description = description;
        }
        if(hours) {
            updatedPeople.hours = hours;
        }
        if(salary) {
            updatedPeople.salary = salary;
        }
        updatedPeople.save();
    }

    deletePeople(peopleId: string) {
        const index = this.findPeople(peopleId)[1];
        this.peoples.splice(index, 1);
    }

    private async findPeople(id: string): Promise<People> {
        let people; 
        try {
            people = await this.peopleModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find people');
        }
        if (!people) {
            throw new NotFoundException('Could not find people');
        }
        return people;
    }

}