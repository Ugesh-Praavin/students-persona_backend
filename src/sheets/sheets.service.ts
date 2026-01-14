import { google, sheets_v4 } from 'googleapis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { AddStudentDto } from './students.dto';

@Injectable()
export class SheetsService {
  private sheets: sheets_v4.Sheets;
  private buffer: AddStudentDto[] = [];
  private flushing = false;
  private readonly BATCH_SIZE = 10;

  constructor(private readonly configService: ConfigService) {
    const privateKey = this.configService.get<string>('GOOGLE_PRIVATE_KEY');
    const clientEmail = this.configService.get<string>('GOOGLE_CLIENT_EMAIL');

    if (!privateKey || !clientEmail) {
      throw new Error('Google Sheets env variables are missing');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  addStudent(data: AddStudentDto) {
    if (process.env.DEMO_MODE === 'true') {
      return { message: 'Demo submission successful' };
    }

    this.buffer.push(data);

    if (this.buffer.length >= this.BATCH_SIZE) {
      this.flush().catch(() => {});
    }

    return { message: 'Student saved for RITverse' };
  }

  private async flush() {
    if (this.flushing || this.buffer.length === 0) return;
    this.flushing = true;

    const batch = [...this.buffer];
    this.buffer = [];

    const values = batch.map((d) => [
      d.name,
      d.class,
      d.section,
      d.school,
      d.city,
      d.email,
      d.mobile,
      d.careerPath,
      d.strengths.join(', '),
      d.skills.join(', '),
      new Date().toISOString(),
    ]);

    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.configService.get<string>('SHEET_ID'),
        range: 'Sheet1!A:K',
        valueInputOption: 'RAW',
        requestBody: { values },
      });
    } catch (err) {
      this.buffer.unshift(...batch);
    } finally {
      this.flushing = false;
    }
  }
}
