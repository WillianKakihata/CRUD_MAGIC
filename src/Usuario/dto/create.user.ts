import { IsArray, IsEnum, IsString } from 'class-validator';
import { UserType } from '../user.type.enum';


export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsArray()
  @IsEnum(UserType, { each: true })
  roles: UserType[];

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  cardsId: string;
}