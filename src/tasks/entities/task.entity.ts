import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TaskEnum } from 'src/common';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: TaskEnum, default: TaskEnum.PENDING })
  status: TaskEnum;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  createdBy: mongoose.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
