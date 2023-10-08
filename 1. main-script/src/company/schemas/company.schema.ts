import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'companies'
})
export class Company {
  @Prop({minlength: 3, maxlength: 50})
  company_name: string;

  @Prop({default: null, minlength: 8, maxlength: 16})
  telephone_number: string | null;

  @Prop({default: false})
  is_active: boolean;

  @Prop({minlength: 10, maxlength: 50})
  address: string | null;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
