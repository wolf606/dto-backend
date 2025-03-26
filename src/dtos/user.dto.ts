import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;

  @IsEnum(Role)
  role!: Role;
}

export class LoginUserDto {
    @IsEmail()
    email!: string;
    
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password!: string;
}
