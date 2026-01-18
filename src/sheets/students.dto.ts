import { IsArray, IsEmail, IsString } from 'class-validator';

export class AddStudentDto {
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

  @IsString()
  mobile: string;

  @IsArray()
  @IsString({ each: true })
  strengths: string[];

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
