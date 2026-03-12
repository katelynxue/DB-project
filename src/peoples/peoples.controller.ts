import { Controller, Post} from '@nestjs/common';

import { PeoplesService } from './peoples.service';

@Controller('peoples')
export class PeopleController {
    constructor(private readonly peoplesService: PeoplesService) {}

    @Post()
    addPeople(): any {
        this.peoplesService.insertPeople();

    }
}