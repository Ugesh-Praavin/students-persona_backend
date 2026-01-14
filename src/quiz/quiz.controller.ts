import { Body, Controller, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitAnswersDto } from './ddto/submit-ansers.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Post('submit')
  submitAnswers(@Body() dto: SubmitAnswersDto) {
    return this.service.submit(dto);
  }
}
