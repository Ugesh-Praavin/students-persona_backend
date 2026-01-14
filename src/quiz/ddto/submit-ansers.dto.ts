import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { StudentProfileDto } from 'src/common/dto/student-profile.dto';
import { AnswerDto } from './answer.dto';

export class SubmitAnswersDto {
  @ValidateNested()
  @Type(() => StudentProfileDto)
  student: StudentProfileDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
