import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ThirdPartyDelivery {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  contact: string;
}
export class DeliveryGuyDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  contact: string;

  @ApiProperty({ type: () => ThirdPartyDelivery })
  @IsObject()
  @ValidateNested()
  @Type(() => ThirdPartyDelivery)
  thirdParty: ThirdPartyDelivery;
}

export class DeliveryGuyArrayDto {
  @ApiProperty({ type: [DeliveryGuyDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeliveryGuyDto)
  deliveryGuys: DeliveryGuyDto[];
}
