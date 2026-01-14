import { IsEmail, IsString } from 'class-validator';

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

  // Explorer pass fields
  careerPath: string;
  strengths: string[];
  skills: string[];
}
