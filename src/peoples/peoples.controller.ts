import { Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';

import { PeoplesService } from './peoples.service';

@Controller('peoples')
export class PeopleController {
    constructor(private readonly peoplesService: PeoplesService) {}

    @Post()
    async addPeople(
        @Body('name') peopleName: string, 
        @Body('job') peopleJob: string, 
        @Body('description') peopleDescription: string, 
        @Body('hours') peopleHours: number, 
        @Body('salary') peopleSalary: number,
    ) {
        const generatedId = await this.peoplesService.insertPeople(
            peopleName, 
            peopleJob, 
            peopleDescription, 
            peopleHours, 
            peopleSalary
        ); 
        return {id: generatedId};
    }

    @Get()
    getAllPeoples() {
        return this.peoplesService.getPeoples();
    }

    @Get(':id')
    getPeople(@Param('id') peopleId: string,) {
        return this.peoplesService.getSinglePeople(peopleId);
    }

    @Patch(':id')
    updatePeople(
        @Param('id') peopleId: string, 
        @Body('name') peopleName: string, 
        @Body('job') peopleJob: string, 
        @Body('description') peopleDescription: string, 
        @Body('hours') peopleHours: number, 
        @Body('salary') peopleSalary: number
    ) {
        this.peoplesService.updatePeople(peopleId, peopleName, peopleJob, peopleDescription, peopleHours, peopleSalary);
        return null;
    }

    @Delete(':id')
    removePeople(@Param('id') peopleId: string,) {
        this.peoplesService.deletePeople(peopleId);
        return null;
    }
}