import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { ThirdPartyModule } from './third-party-delivery/thirdparty.module';
import { DeliveryGuyModule } from './delivery-guy/delivery-guy.module';

@Module({
  imports: [PrismaModule, OrdersModule,ThirdPartyModule,DeliveryGuyModule],
})
export class AppModule {}
