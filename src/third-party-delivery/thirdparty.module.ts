import { Module } from "@nestjs/common";
import { ThirdPartyService } from "./thirdparty.service";
import { ThirdPartyController } from "./thirdparty.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ThirdPartyController],
  providers: [ThirdPartyService],
})
export class ThirdPartyModule {}