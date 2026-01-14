import { Module } from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { SheetsController } from './sheets.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  providers: [
    SheetsService,
    {
      provide: APP_GUARD, // 👈 Binds the guard globally
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [SheetsController],
  exports: [SheetsService],
})
export class SheetsModule {}
