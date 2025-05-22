import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [PrismaModule, OrdersModule, ShippingModule],
})
export class AppModule {}
