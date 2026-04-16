import { Controller, Post, Body, Get, Param, Patch, Delete, Query} from '@nestjs/common';

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
    async getAllPeoples() {
        const peoples = await this.peoplesService.getPeoples();
        return peoples;
    }

    @Get(':id')
    getPeople(@Param('id') peopleId: string,) {
        return this.peoplesService.getSinglePeople(peopleId);
    } 

    @Patch(':id')
    async updatePeople(
        @Param('id') peopleId: string, 
        @Body('name') peopleName: string, 
        @Body('job') peopleJob: string, 
        @Body('description') peopleDescription: string, 
        @Body('hours') peopleHours: number, 
        @Body('salary') peopleSalary: number
    ) {
        await this.peoplesService.updatePeople(peopleId, peopleName, peopleJob, peopleDescription, peopleHours, peopleSalary);
        return null;
    }  

    @Delete(':id')
    async removePeople(@Param('id') peopleId: string,) {
        await this.peoplesService.deletePeople(peopleId);
        return null;
    }

    @Get('/job/:job')
    async getPeopleByJob(@Param('job') job: string,) {
        await this.peoplesService.getPeopleByJob(job);
    }

    @Get('/salary')
    async getPeopleBySalary(
        @Query('min') min: number,
        @Query('max') max: number,
    ){
        return this.peoplesService.getPeopleBySalary(min, max);
    }
}