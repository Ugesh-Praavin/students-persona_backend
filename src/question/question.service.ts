import { Injectable } from '@nestjs/common';
import { RITVERSE_QUESTIONS } from './data/ritverse.questions';
import { Question } from './interface/question.interface';

@Injectable()
export class QuestionService {
  getQuestions(): Question[] {
    return RITVERSE_QUESTIONS;
  }
}
