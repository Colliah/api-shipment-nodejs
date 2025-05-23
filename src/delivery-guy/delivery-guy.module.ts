import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DeliveryGuyService } from './delivery-guy.service';
import { DeliveryGuyController } from './delivery-guy.controller';
@Module({
  imports: [PrismaModule],
  controllers: [DeliveryGuyController],
  providers: [DeliveryGuyService],
})
export class DeliveryGuyModule {}
