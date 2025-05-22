import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  CreateOrderDto,
  OrderDto,
  OrderResponseDto,
  UpdateOrderDto,
} from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
   //Add
   @Post()
   @ApiOperation({ summary: 'Create new order' })
   @ApiResponse({ status: 201, type: OrderResponseDto })
   async createOrder(@Body() createOrderDto: CreateOrderDto) {
     return this.ordersService.createOrder(createOrderDto);
   }
  //Get All
  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  getOrders(@Body() dto: OrderDto) {
    return this.ordersService.getOrders();
  }
  //Get by Id
  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
  //Update
  @Put(':id')
  @ApiOperation({ summary: 'Update order by id' })
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }
  //Delete
  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
