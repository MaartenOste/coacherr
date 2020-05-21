import { NextFunction, Request, Response } from 'express';
import { IMember,IMemberType, Member, MemberType } from '../../models/mongoose';

import { AuthService, IConfig } from '../../services';
import { NotFoundError } from '../../utilities';

class MemberController {
  private authService: AuthService;
  private config: IConfig;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let members = await Member.find()
        .populate('membertype')
        .sort({ _createdAt: -1 })
        .exec();

      return res.status(200).json(members);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const member = await Member.findById(id)
      .populate('membertype')
      .exec();
      return res.status(200).json(member);
    } catch (err) {
      next(err);
    }
  };

  showMembersFromClub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clubId, age } = req.params;
      const players = await Member.find()
      .populate('membertype')
      .where('_clubId', clubId)
      .where('ageCategory', age);
      return res.status(200).json(players);
    } catch (err) {
      next(err);
    }
  }

  destroy = async (req: Request, res: Response, next: NextFunction) => {};

  edit = async (req: Request, res: Response, next: NextFunction) => {};

  store = async (req: Request, res: Response, next: NextFunction) => {};

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {
      id,
      firstname,
      lastname,
      email,
      ageCategory,
      phoneNumber,
      extraInfo,
      localProvider,
      facebookProvider,
      _clubId,
      _memberTypeId,
    } = req.body;

    let foundMember = await Member.find().where("_id", id);
    if (!foundMember) {
      return res.status(403).json({ error: 'User with that id doesn\'t exist ', id });
    }else {
      await Member.updateOne({ "_id": id }, {$set: {
        firstname,
        lastname,
        email,
        ageCategory,
        phoneNumber,
        extraInfo,
        localProvider,
        facebookProvider,
        _clubId,
        _memberTypeId,
      }});

      return res.status(200).json({
        id: id,
        firstname,
        lastname,
        email,
        ageCategory,
        phoneNumber,
        extraInfo,
        localProvider,
        facebookProvider,
        _clubId,
        _memberTypeId,
      })
    }
  };

  signupLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const {
      email,
      firstname,
      lastname,
      phoneNumber,
    } = req.body;

    let founMember = await Member.findOne({ email: email });
    if (founMember) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newMember: IMember = new Member({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
    });

    const member: IMember = await newMember.save();

    const token = this.authService.createToken(member);
    return res.status(200).json({
      email: member.email,
      id: member._id,
      token: `${token}`,
      strategy: 'local',
    });
  };

  signInLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    this.authService.passport.authenticate(
      'local',
      { session: this.config.auth.jwt.session },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new NotFoundError());
        }
        const token = this.authService.createToken(user);
        return res.status(200).json({
          email: user.email,
          id: user._id,
          token: `${token}`,
          strategy: 'local',
          type: user._memberTypeId,
        });
      },
    )(req, res, next);
  };
}

export default MemberController;
