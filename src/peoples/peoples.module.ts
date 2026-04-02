import {Module} from '@nestjs/common';

import { PeopleController } from './peoples.controller';
import { PeoplesService } from './peoples.service';

@Module({
    controllers: [PeopleController],
    providers: [PeoplesService],
})

export class PeoplesModule {}