import { Injectable, BadRequestException } from '@nestjs/common';
import { SubmitAnswersDto } from './ddto/submit-ansers.dto';
import { RITVERSE_QUESTIONS } from 'src/question/data/ritverse.questions';
import { initInterestScore } from './utils/init-interest-score.util';
import { InterestBucket } from 'src/common/enum/interest-bucket.enum';
import { PersonalityTrait } from 'src/common/enum/personality-trait.enum';
import { generateExplorerPass } from './utils/generate-explorer-pass.util';
import { SheetsService } from 'src/sheets/sheets.service';

@Injectable()
export class QuizService {
  constructor(private readonly sheetsService: SheetsService) {}

  submit(dto: SubmitAnswersDto) {
    const interestScores = initInterestScore();
    const traits = new Set<PersonalityTrait>();

    for (const answer of dto.answers) {
      const question = RITVERSE_QUESTIONS.find(
        (q) => q.id === answer.questionId,
      );

      if (!question) {
        throw new BadRequestException('Invalid question ID');
      }

      for (const selectedKey of answer.selectedOptions) {
        const option = question.options[selectedKey];

        if (!option) {
          throw new BadRequestException(
            `Invalid option ${selectedKey} for question ${question.id}`,
          );
        }

        for (const tag of option.mapsTo) {
          if (Object.values(InterestBucket).includes(tag as InterestBucket)) {
            interestScores[tag as InterestBucket] += 1;
          }

          if (
            Object.values(PersonalityTrait).includes(tag as PersonalityTrait)
          ) {
            traits.add(tag as PersonalityTrait);
          }
        }
      }
    }

    const pass = generateExplorerPass(interestScores, Array.from(traits));

    this.sheetsService.addStudent({
      ...dto.student,
      careerPath: pass.careerPath,
      strengths: pass.strengths,
      skills: pass.skills,
    });

    return pass;
  }
}
