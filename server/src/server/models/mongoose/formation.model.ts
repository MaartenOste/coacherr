import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { IMember } from './member.model';

interface IFormation extends Document {
  structure: string;
  ageCategory: string;
  _coachId: IMember['_id'];
  _playersIds: Array<IMember['_id']>;

  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  slugify(): void;
}

interface IFormationModel extends PaginateModel<IFormation> {}

const formationSchema: Schema = new Schema(
  {
    structure: { type: String, required: true, max: 16 },
    ageCategory: {
      type: String,
      required: true,
      max: 16,
    },
    _coachId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    _playersIds: [
      { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    ],

    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

formationSchema.virtual('id').get(function(this: IFormation) {
  return this._id;
});

formationSchema.virtual('coach', {
  ref: 'Member',
  localField: '_coachId',
  foreignField: '_id',
  justOne: true,
});

formationSchema.virtual('players', {
  ref: 'Member',
  localField: '_playersIds',
  foreignField: '_id',
  justOne: false,
});

formationSchema.virtual('statistic', {
  ref: 'Statistic',
  localField: '_statisticId',
  foreignField: '_id',
  justOne: true,
});

formationSchema.plugin(mongoosePaginate);
const Formation = mongoose.model<IFormation, IFormationModel>(
  'Formation',
  formationSchema,
);

export { IFormation, Formation, formationSchema };
