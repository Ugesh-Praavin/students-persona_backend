import { IsArray, IsIn, IsNumber } from 'class-validator';

export class AnswerDto {
  @IsNumber()
  questionId: number;

  @IsArray()
  @IsIn(['A', 'B', 'C', 'D', 'E', 'F'], { each: true })
  selectedOptions: ('A' | 'B' | 'C' | 'D' | 'E' | 'F')[];
}
