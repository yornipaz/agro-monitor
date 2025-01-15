import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/activity.dto';
import { IsUUID } from 'class-validator';


@Controller('activities')
export class ActivitiesController {

    // Implement CRUD operations here

    constructor(private readonly activitiesService: ActivitiesService) { }

    @Post()
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.create(createActivityDto);
    }

    @Get()
    findAll() {
        return this.activitiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.activitiesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateActivityDto: Partial<CreateActivityDto>,
    ) {
        return this.activitiesService.update(id, updateActivityDto);
    }

    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.activitiesService.remove(id);
    }
}
