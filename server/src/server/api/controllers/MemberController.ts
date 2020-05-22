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
        .populate('club')
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
      .populate('club')
      .exec();
      return res.status(200).json(member);
    } catch (err) {
      next(err);
    }
  };
  
  emptyMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await Member.findOne({email: 'add@email.com'})
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

  showPlayersFromClub = async (req: Request, res: Response, next: NextFunction) => {
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
    const { id } = req.params;

    try{
    const memberUpdate = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      ageCategory: req.body.ageCategory,
      phoneNumber: req.body.phoneNumber,
      extraInfo: req.body.extraInfo,
      localProvider: req.body.localProvider,
      facebookProvider: req.body.facebookProvider,
      _clubId: req.body._clubId,
      _memberTypeId: req.body._memberTypeId,
    }

    const member = await Member.findOneAndUpdate({_id: id}, memberUpdate, {
      new: true
    }).exec();
    if (!member) {
      throw new NotFoundError();
    }
    return res.status(200).json(member);
  } catch (err) {
    next(err);
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
      password,
      _memberTypeId,
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
      localProvider:{
        password: password,
      },
      _memberTypeId
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
