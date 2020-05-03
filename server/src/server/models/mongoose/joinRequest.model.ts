import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { IMember } from './member.model';
import { IClub } from './club.model';

interface IJoinRequest extends Document {
  _clubId: IClub['_id'];
  _memberId: IMember['_id'];
  
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  slugify(): void;
}

interface IJoinRequestModel extends PaginateModel<IJoinRequest> {}

const joinRequestSchema: Schema = new Schema(
  {
  _clubId: {type: Schema.Types.ObjectId, ref: 'Club', required: true },
  _memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },

  _createdAt: { type: Number, required: true, default: Date.now() },
  _modifiedAt: { type: Number, required: false, default: null },
  _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

joinRequestSchema.virtual('id').get(function(this: IJoinRequest) {
  return this._id;
});
joinRequestSchema.virtual('member', {
  ref: 'Member',
  localField: '_membersId',
  foreignField: '_id',
  justOne: true,
});
joinRequestSchema.virtual('club', {
  ref: 'Club',
  localField: '_clubId',
  foreignField: '_id',
  justOne: true,
});

joinRequestSchema.plugin(mongoosePaginate);
const JoinRequest = mongoose.model<IJoinRequest, IJoinRequestModel>('JoinRequest', joinRequestSchema);

export { IJoinRequest, JoinRequest, joinRequestSchema };
