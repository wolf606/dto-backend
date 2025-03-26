import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;
}

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;
  
    @IsOptional()
    @IsNumber()
    price?: number;
}

export class IdDto {
    @IsString()
    @IsNotEmpty()
    id!: string;
}

