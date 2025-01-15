import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/parcels.dto';

@Controller('parcels')
export class ParcelsController {
    constructor(private readonly parcelsService: ParcelsService) { }

    @Post()
    create(@Body() createParcelDto: CreateParcelDto) {
        return this.parcelsService.create(createParcelDto);
    }

    @Get()
    findAll() {
        return this.parcelsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.parcelsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateParcelDto: Partial<CreateParcelDto>) {
        return this.parcelsService.update(id, updateParcelDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.parcelsService.remove(id);
    }
}
