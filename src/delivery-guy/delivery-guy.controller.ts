import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeliveryGuyService } from './delivery-guy.service';
import { DeliveryGuyDto } from './dto/delivery-guy.dto';

@ApiTags('Delivery Guys')
@Controller('delivery-guy')
export class DeliveryGuyController {
  constructor(private readonly deliveryGuy: DeliveryGuyService) {}
  //create
  @Post()
  @ApiResponse({ type: DeliveryGuyDto })
  createDeliveryGuy(data: any) {
    return this.deliveryGuy.createDeliveryGuy(data);
  }
  // get all delivery guys
  @Get()
  @ApiResponse({ type: [DeliveryGuyDto] })
  getDeliveryGuys() {
    return this.deliveryGuy.getDeliveryGuys();
  }
  //get by id
  @Get(':id')
  @ApiResponse({ type: DeliveryGuyDto })
  getDeliveryGuyById(@Param('id') id: string) {
    return this.deliveryGuy.getDeliveryGuyById(id);
  }
  //update
  @Put(':id')
  @ApiResponse({ type: DeliveryGuyDto })
  updateDeliveryGuy(@Param('id') id: string, data: any) {
    return this.deliveryGuy.updateDeliveryGuy(id, data);
  }
  //delete
  @Delete(':id')
  @ApiResponse({ type: DeliveryGuyDto })
  deleteDeliveryGuy(@Param('id') id: string) {
    return this.deliveryGuy.deleteDeliveryGuy(id);
  }
}
