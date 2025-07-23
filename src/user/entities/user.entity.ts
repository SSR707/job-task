import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserRole } from 'src/common';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'course' }] })
  registeredCourses: Types.ObjectId[];

  @Prop({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
