// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailConfig } from './email.config';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport(emailConfig);

  async sendEmail(to: string): Promise<void> {
    try {
      const emailOptions = {
        from: 'admin@dipay.com',
        to: to,
        subject: 'Welcome to Our Company',
        text: 'Thank you for joining our company!',
      };

      await this.transporter.sendMail(emailOptions);
      console.log('Email sent successfully:', emailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
        }
    }
}
