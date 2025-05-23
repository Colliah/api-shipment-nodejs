import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ThirdPartyService {
  constructor(private prisma: PrismaService) {}
  //Post
  createThirdParty(data: any) {
    return this.prisma.thirdPartyDelivery.create({
      data,
    });
  }
  //Get All ThirdParty
  getAllThirdParty() {
    return this.prisma.thirdPartyDelivery.findMany();
  }
  //Get By Id
  getThirdPartyById(id: string) {
    return this.prisma.thirdPartyDelivery.findUnique({
      where: {
        id,
      },
    });
  }
  //Update
  updateThirdParty(id: string, data: any) {
    return this.prisma.thirdPartyDelivery.update({
      where: {
        id,
      },
      data,
    });
  }
  //Delete
  deleteThirdParty(id: string) {
    return this.prisma.thirdPartyDelivery.delete({
      where: {
        id,
      },
    });
  }
}
