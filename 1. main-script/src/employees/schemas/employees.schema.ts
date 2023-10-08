import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from '../../company/schemas/company.schema';
import mongoose from 'mongoose';

export enum JobTitle {
  Manager = 'manager',
  Director = 'director',
  Staff = 'staff',
}

@Schema({
  timestamps: true,
  collection: 'employees'
})
export class Employee {
  @Prop({minlength: 2, maxlength: 50})
  name: string;

  @Prop({minlength: 5, maxlength: 255})
  email: string

  @Prop({default: null, minlength: 8, maxlength: 16})
  phone_number: string | null

  @Prop({ enum: JobTitle, default: JobTitle.Staff })
  jobtitle: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company_id: Company;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
