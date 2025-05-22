import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { OrderStatusEnum, PaymentMethod, PaymentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
export class PaymentDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
export class ProductDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
export class CustomerInfoDto {
  @ApiProperty()
  @IsArray()
  phone: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  ward: string;

  @ApiProperty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsString()
  city: string;
}
export class OrderItemDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty({ type: () => ProductDto })
  @ValidateNested()
  @Type(() => ProductDto)
  product: ProductDto;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsNumber()
  total: number;
}

export class OrderDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty({ type: () => CustomerInfoDto })
  @ValidateNested()
  @Type(() => CustomerInfoDto)
  shippingAddress: CustomerInfoDto;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  totalItem: number;

  @ApiProperty({ enum: OrderStatusEnum })
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  originAddress?: string;

  @ApiProperty({ type: () => PaymentDto })
  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  expectedDeliveryDate?: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  deliveredAt?: Date;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;
  
  @ApiProperty()
  @IsNumber()
  total: number;
}
export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
  @IsUUID()
  shippingAddressId: string;

  @ApiProperty({ type: [OrderDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  orderItems: OrderDto[];

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  originAddress?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  expectedDeliveryDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  note?: string;
}

export class OrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  totalItem: number;

  @ApiProperty({ enum: OrderStatusEnum })
  status: OrderStatusEnum;

  @ApiProperty({ required: false })
  deliveredAt?: Date;

  @ApiProperty({ required: false })
  expectedDeliveryDate?: Date;

  @ApiProperty({ type: [OrderDto] })
  orderItems: OrderDto[];
}
