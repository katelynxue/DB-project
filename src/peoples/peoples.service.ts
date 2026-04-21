import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {People} from './people.model';

@Injectable()
export class PeoplesService {
    constructor(
        @InjectModel('People') private readonly peopleModel: Model<People>
    ) {}

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

    async updatePeople(
        peopleId: string, 
        name: string, 
        job: string, 
        description: string, 
        hours: number, 
        salary: number
    ) {
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

    async deletePeople(peopleId: string) {
        const result = await this.peopleModel.deleteOne({_id: peopleId}).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find people');

        }
    }

    private async findPeople(id: string): Promise<People> {
        let people; 
        try {
            people = await this.peopleModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find people');
        }
        if (!people) {
            throw new NotFoundException('Could not find people');
        }
        return people;
    }

    async getPeopleByJob(job: string) {
        const jobs = await this.peopleModel.find({job:job}).exec();
        return jobs;
    }

    async getPeopleBySalary(min: number, max: number) { //https://www.mongodb.com/docs/manual/reference/operator/aggregation/min/
        const filter: any = {};
        
        if(min) {
            filter.salary = {...filter.salary, $gte: min};
        }

        if(max) {
            filter.salary = {...filter.salary, $lte: max};
        }
        return await this.peopleModel.find(filter).exec();
    }

}