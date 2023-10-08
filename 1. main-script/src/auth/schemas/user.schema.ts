import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'admins'
})
export class Admin extends Document {
  @Prop({ unique: [true, 'Duplicate username entered'] })
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(Admin);
