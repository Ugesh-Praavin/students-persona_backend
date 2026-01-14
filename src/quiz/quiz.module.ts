import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { SheetsService } from 'src/sheets/sheets.service';

@Module({
  providers: [QuizService, SheetsService],
  controllers: [QuizController],
})
export class QuizModule {}
