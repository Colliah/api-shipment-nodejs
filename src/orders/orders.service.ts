import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  //Get All
  async getOrders() {
    return this.prisma.order.findMany();
  }
  //Get by Id
  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        shippingAddress: true,
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }
  //Create
  async createOrder(createOrder: CreateOrderDto) {
    const {
      customerId,
      shippingAddressId,
      orderItems,
      paymentMethod,
      note,
      expectedDeliveryDate,
    } = createOrder;

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
      }),
    );

    const totalPrice = orderItemsData.reduce(
      (sum, item) => sum + item.total,
      0,
    );
    const totalItem = orderItemsData.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

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
          },
        },
        payment: true,
      },
    });
  }
  //Delete
  async deleteOrder(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
  //Update
  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const {
      customerId,
      shippingAddressId,
      orderItems,
      paymentMethod,
      note,
      expectedDeliveryDate,
      originAddress,
    } = updateOrderDto;

    const updateData: any = {};

    if (customerId) {
      updateData.customer = { connect: { id: customerId } };
    }
    if (shippingAddressId) {
      updateData.shippingAddress = { connect: { id: shippingAddressId } };
    }
    if (note !== undefined) {
      updateData.note = note;
    }
    if (expectedDeliveryDate) {
      updateData.expectedDeliveryDate = expectedDeliveryDate;
    }
    if (originAddress !== undefined) {
      updateData.originAddress = originAddress;
    }
    if (orderItems) {
      // Delete existing order items
      await this.prisma.orderItem.deleteMany({
        where: { orderId: id },
      });

      // Calculate and create new order items
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
        }),
      );

      updateData.orderItems = {
        create: orderItemsData,
      };

      // Update totals
      updateData.totalPrice = orderItemsData.reduce(
        (sum, item) => sum + item.total,
        0,
      );
      updateData.totalItem = orderItemsData.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
    }

    if (paymentMethod) {
      updateData.payment = {
        update: {
          method: paymentMethod,
        },
      };
    }

    return this.prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        customer: true,
        shippingAddress: true,
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });
  }
}
