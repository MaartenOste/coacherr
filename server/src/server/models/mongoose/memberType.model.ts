import mongoose, { Schema, Document, Model } from 'mongoose';

interface IMemberType extends Document {
  name: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  slugify(): void;
}

interface IMemberTypeModel extends Model<IMemberType> {}

const memberTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: false, max: 64 },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const MemberType = mongoose.model<IMemberType, IMemberTypeModel>(
  'MemberType',
  memberTypeSchema,
);

export { IMemberType, MemberType, memberTypeSchema };
