import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliveryGuyService {
  constructor(private prisma: PrismaService) {}
  //Get All
  async getDeliveryGuys() {
    return this.prisma.deliveryGuy.findMany();
  }
  //Get by ID
  async getDeliveryGuyById(id: string) {
    return this.prisma.deliveryGuy.findUnique({
      where: {
        id: id,
      },
    });
  }
  //Create
  async createDeliveryGuy(data: any) {
    return this.prisma.deliveryGuy.create({
      data: data,
    });
  }
  //Delete
  async deleteDeliveryGuy(id: string) {
    return this.prisma.deliveryGuy.delete({
      where: {
        id: id,
      },
    });
  }
  //Update
  async updateDeliveryGuy(id: string, data: any) {
    return this.prisma.deliveryGuy.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

}
