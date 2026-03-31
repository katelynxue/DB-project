import { Controller, Post, Body} from '@nestjs/common';

import { PeoplesService } from './peoples.service';

@Controller('peoples')
export class PeopleController {
    constructor(private readonly peoplesService: PeoplesService) {}

    @Post()
    addPeople(
        @Body('name') peopleName: string, 
        @Body('job') peopleJob: string, 
        @Body('description') peopleDescription: string, 
        @Body('hours') peopleHours: number, 
        @Body('salary') peopleSalary: number): any {
        this.peoplesService.insertPeople(peopleName, peopleJob, peopleDescription, peopleHours, peopleSalary); 
    }
}