import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { IFormation } from './formation.model';

interface IStatistic extends Document {
  score: string;
  yellow: object;
  red: object;

  _formationId: IFormation['_id'];

  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  slugify(): void;
}

interface IStatisticModel extends PaginateModel<IStatistic> {}

const statisticSchema: Schema = new Schema(
  {
    score: {
      type: String,
      required: true,
      max: 8,
    },
    yellow: {
      type: Object,
      required: false,
    },
    red: {
      type: Object,
      required: false,
    },
    _formationId: {
      type: Schema.Types.ObjectId,
      ref: 'Formation',
      required: false,
    },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

statisticSchema.virtual('id').get(function(this: IStatistic) {
  return this._id;
});

statisticSchema.virtual('formation', {
  ref: 'Formation',
  localField: '_formationId',
  foreignField: '_id',
  justOne: true,
});

statisticSchema.plugin(mongoosePaginate);
const Statistic = mongoose.model<IStatistic, IStatisticModel>(
  'Statistic',
  statisticSchema,
);

export { IStatistic, Statistic, statisticSchema };
