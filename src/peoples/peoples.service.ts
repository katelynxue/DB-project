import { Injectable } from "@nestjs/common";

import { People } from './people.model';

@Injectable()
export class PeoplesService {
    peoples: People [] = [];

    insertPeople(name: string, job: string, desc: string, hours: number, salary: number) {
        const peopleId = new Date().toString();
        const newPeople = new People(peopleId, name, job, desc, hours, salary);
        this.peoples.push(newPeople);
        return peopleId;
    }
}