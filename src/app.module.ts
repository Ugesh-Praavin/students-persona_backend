import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';

import { SheetsModule } from './sheets/sheets.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    QuestionModule,
    QuizModule,
    SheetsModule,
    ConfigModule.forRoot({
      isGlobal: true, // 👈 VERY IMPORTANT
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 6000,
          limit: 30,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
