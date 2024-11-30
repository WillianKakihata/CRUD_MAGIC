import { IsArray, IsOptional, IsString } from "class-validator";
import { Role } from "src/Auth/enum/role.enum";

export class UpdateUserDto{
    
    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    roles: Role[];
}