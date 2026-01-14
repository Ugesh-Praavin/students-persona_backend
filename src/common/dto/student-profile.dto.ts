import { IsEmail, IsOptional, IsString, IsNumberString } from 'class-validator';

export class StudentProfileDto {
  @IsString()
  name: string;

  @IsString()
  class: string;

  @IsString()
  section: string;

  @IsString()
  school: string;

  @IsString()
  city: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  mobile: string;
}
