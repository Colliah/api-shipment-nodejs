import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThirdPartyDeliveryDto } from './dto/thirdpartydelivery';
import { ThirdPartyService } from './thirdparty.service';

@ApiTags('Third Party Delivery')
@Controller('thirdparty')
export class ThirdPartyController {
  constructor(private readonly thirdpartyService: ThirdPartyService) {}
  //create
  @Post()
  createThirdPartyDelivery(@Body() dto: ThirdPartyDeliveryDto) {
    return this.thirdpartyService.createThirdParty(dto);
  }
  //get all
  @Get()
  getThirdPartyDelivery(@Body() dto: ThirdPartyDeliveryDto) {
    return this.thirdpartyService.getAllThirdParty();
  }
  //get by id
  @Get(':id')
  getThirdPartyDeliveryById(@Body() dto: ThirdPartyDeliveryDto) {
    return this.thirdpartyService.getThirdPartyById(dto.id);
  }
  //update
  @Put(':id')
  updateThirdPartyDelivery(@Param('id') id: string, data: any) {
    return this.thirdpartyService.updateThirdParty(id, data);
  }
  //delete
  @Delete(':id')
  deleteThirdPartyDelivery(@Param('id') id: string) {
    return this.thirdpartyService.deleteThirdParty(id);
  }
}
