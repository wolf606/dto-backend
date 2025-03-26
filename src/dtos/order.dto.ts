import { IsString, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;
}

export class GetOrderByIdDto {
    @IsString()
    @IsNotEmpty()
    id!: string;
}