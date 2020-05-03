import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as bcrypt } from 'bcrypt';
import { default as slug } from 'slug';
import { IMember } from './member.model';
import { IJoinRequest } from './joinRequest.model';

interface ILocalProvider {
  password: string;
}

interface IClub extends Document {
  name: string;
  slug: string;
  clubNumber: number;
  localProvider?: ILocalProvider;
  logoURL: string;
  email: string;
  phoneNumber: string;
  clubColors: string;

  _membersIds: Array<IMember['_id']>;

  _joinRequestIds: Array<IJoinRequest['_id']>;

  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  slugify(): void;
}

interface IClubModel extends PaginateModel<IClub> {}

const clubSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 128,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
	  },
    clubNumber: {
      type: Number,
      required: true,
      unique: true,
      max: 99999,
    },
    localProvider: {
      password: {
        type: String,
        required: true,
      },
    },
    logoURL: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      max: 128,
      },
    phoneNumber: {
      type: String,
      required: true,
      max: 16,
      },
    clubColors: {
      type: String,
      required:false,
    },
    _postIds: [{ type: Schema.Types.ObjectId, ref: 'Member', required: false }],
    _membersIds: [{type: Schema.Types.ObjectId, ref: 'Member', required: false}],
    _joinRequestIds: [{ type: Schema.Types.ObjectId, ref: 'JoinRequest', required: false }],

    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

clubSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

clubSchema.pre<IClub>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

clubSchema.pre('save', function(next) {
  const club: IClub = this as IClub;

  if (!club.isModified('localProvider.password')) return next();

  try {
    return bcrypt.genSalt(10, (errSalt, salt) => {
      if (errSalt) throw errSalt;

      bcrypt.hash(club.localProvider.password, salt, (errHash, hash) => {
        if (errHash) throw errHash;

        club.localProvider.password = hash;
        return next();
      });
    });
  } catch (err) {
    return next(err);
  }
});

clubSchema.virtual('id').get(function(this: IClub) {
  return this._id;
});

clubSchema.virtual('members', {
  ref: 'Member',
  localField: '_membersIds',
  foreignField: '_id',
  justOne: false,
});

clubSchema.virtual('joinRequests', {
	ref: 'JoinRequest',
	localField: '_joinRequestsIds',
	foreignField: '_id',
	justOne: false,
  });

clubSchema.plugin(mongoosePaginate);
const Club = mongoose.model<IClub, IClubModel>('Club', clubSchema);

export { IClub, Club, clubSchema };
