import { Injectable } from "@nestjs/common";

import { People } from './people.model';

@Injectable()
export class PeoplesService {
    peoples: People [] = [];

    insertPeople(name: string, job: string, desc: string, hours: number, salary: number) {
        const newPeople = new People(new Date().toString(), job, desc, hours, salary);
        this.peoples.push(newPeople);
    }
}