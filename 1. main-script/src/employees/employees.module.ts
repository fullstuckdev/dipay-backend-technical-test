import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { EmployeeController } from './employees.controller';
import { EmployeeService } from './employees.service';
import { EmployeeSchema } from './schemas/employees.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
