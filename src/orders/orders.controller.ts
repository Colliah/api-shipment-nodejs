import { Controller, Get, Body, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto, OrderDto, OrderResponseDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  getOrders(@Body() dto:OrderDto) {
    return this.ordersService.getOrders();
  }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 201, type: OrderResponseDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
}
