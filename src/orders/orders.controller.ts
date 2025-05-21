import { Controller, Get,Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  getOrders(@Body() dto:OrderDto) {
    return this.ordersService.getOrders();
  }

}
