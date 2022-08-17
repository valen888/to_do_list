import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type MongoMicrositeDocument = MongoTask & Document;

@Schema()
export class MongoTask {
  @Prop()
  text: string;

  @Prop()
  isDone: boolean;
}

export const MongoTaskSchema = SchemaFactory.createForClass(MongoTask);

MongoTaskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
