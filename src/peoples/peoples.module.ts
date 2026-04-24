import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { PeopleController } from './peoples.controller';
import { PeoplesService } from './peoples.service';
import { PeopleSchema } from './people.model'; // importing everything and kept the same with video

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'People', schema: PeopleSchema}])
    ],
    controllers: [PeopleController],
    providers: [PeoplesService],
})

export class PeoplesModule {}