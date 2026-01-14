import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { AddStudentDto } from './students.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Throttle({ short: { limit: 30, ttl: 60000 } })
  @Post('student')
  add(@Body() body: AddStudentDto) {
    return this.sheetsService.addStudent(body);
  }
}
