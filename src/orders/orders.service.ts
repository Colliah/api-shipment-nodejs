import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOrders() {
    return this.prisma.order.findMany();
  }
   
  async createOrder(createOrder: CreateOrderDto) {
    const { customerId, shippingAddressId, orderItems, paymentMethod, note, expectedDeliveryDate, originAddress } = createOrder;

    // Calculate order items and total
    const orderItemsData = await Promise.all(
      orderItems.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) {
          throw new Error(`Product with id ${item.productId} not found`);
        }
        const unitPrice = product.price;
        const total = unitPrice * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice,
          total,
        };
      })
    );

    const totalPrice = orderItemsData.reduce((sum, item) => sum + item.total, 0);
    const totalItem = orderItemsData.reduce((sum, item) => sum + item.quantity, 0);

    return this.prisma.order.create({
      data: {
        customer: { connect: { id: customerId } },
        shippingAddress: { connect: { id: shippingAddressId } },
        orderItems: {
          create: orderItemsData,
        },
        payment: {
          create: {
            method: paymentMethod,
            status: 'PENDING',
          },
        },
        totalPrice,
        totalItem,
        status: 'PENDING',
        note,
        expectedDeliveryDate,
      },
      include: {
        customer: true,
        shippingAddress: true,
        orderItems: {
          include: {
            product: true,
          }
        },
        payment: true,
      },
    });
  }
}
