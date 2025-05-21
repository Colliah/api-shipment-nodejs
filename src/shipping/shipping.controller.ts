// import { Controller, Post, Get, Body, Param } from '@nestjs/common';
// import { ShippingService } from './shipping.service';
// import { CreateShippingDto } from './dto/create-shipping.dto';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';

// @ApiTags('Shipping')
// @Controller('shipping')
// export class ShippingController {
//   constructor(private readonly shippingService: ShippingService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create new shipment' })
//   createShipment(@Body() createShippingDto: CreateShippingDto) {
//     return this.shippingService.createShipment(createShippingDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all shipments' })
//   getShipments() {
//     return this.shippingService.getShipments();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get shipment by id' })
//   getShipmentById(@Param('id') id: string) {
//     return this.shippingService.getShipmentById(id);
//   }
// }