import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { IMemberType } from './memberType.model';
import { IClub } from './club.model';
import { default as bcrypt } from 'bcrypt';

interface IExtraInfo {
  position: string;
  foot: string;
}

interface ILocalProvider {
  password: string;
}

interface IFacebookProvider {
  id: string;
  token: string;
}

interface IMember extends Document {
  firstname: string;
  lastname: string;
  email: string;
  ageCategory: string;
  phoneNumber: string;

  extraInfo: IExtraInfo;

  _clubId: IClub['_id'];
  _memberTypeId: Array<IMemberType['_id']>;

  localProvider?: ILocalProvider;
  facebookProvider?: IFacebookProvider;

  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  comparePassword(candidatePassword: String, cb: Function): void;
  slugify(): void;
}

interface IMemberModel extends PaginateModel<IMember> {}

const memberSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      max: 64,
    },
    lastname: {
      type: String,
      required: true,
      max: 64,
    },
    email: {
      type: String,
      required: true,
      max: 128,
    },
    ageCategory: {
      type: String,
      required: false,
      max: 16,
    },
    phoneNumber: {
      type: String,
      required: false,
      max: 16,
    },
    extraInfo: {
      position: String,
      foot: String,
      required: false,
    },
    localProvider: {
      password: {
        type: String,
        required: false,
      },
    },
    facebookProvider: {
      id: {
        type: String,
        required: false,
      },
      token: {
        type: String,
        required: false,
      },
    },
    _clubId: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: false,
    },
    _memberTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'MemberType',
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

memberSchema.virtual('id').get(function(this: IMember) {
  return this._id;
});

memberSchema.virtual('membertype', {
  ref: 'MemberType',
  localField: '_memberTypeId',
  foreignField: '_id',
  justOne: false,
});

memberSchema.virtual('club', {
  ref: 'Club',
  localField: '_clubId',
  foreignField: '_id',
  justOne: true,
});

memberSchema.pre('save', function(next) {
  const member: IMember = this as IMember;

  if (!member.isModified('localProvider.password')) return next();

  try {
    return bcrypt.genSalt(10, (errSalt, salt) => {
      if (errSalt) throw errSalt;

      bcrypt.hash(member.localProvider.password, salt, (errHash, hash) => {
        if (errHash) throw errHash;

        member.localProvider.password = hash;
        return next();
      });
    });
  } catch (err) {
    return next(err);
  }
});

memberSchema.methods.comparePassword = function(
  candidatePassword: String,
  cb: Function,
) {
  const user = this;
  bcrypt.compare(candidatePassword, user.localProvider.password, (err, isMatch) => {
    if (err) return cb(err, null);
    return cb(null, isMatch);
  });
};

memberSchema.plugin(mongoosePaginate);
const Member = mongoose.model<IMember, IMemberModel>('Member', memberSchema);

export { IMember, Member, memberSchema };
