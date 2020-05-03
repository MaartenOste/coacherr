import { NextFunction, Request, Response } from 'express';
import { IMember, Member } from '../../models/mongoose';

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
        .exec();
      return res.status(200).json(member);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {}

  edit = async (req: Request, res: Response, next: NextFunction) => {}

  store = async (req: Request, res: Response, next: NextFunction) => {}

  update = async (req: Request, res: Response, next: NextFunction) => {}

  signupLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { email, firstname, lastname,ageCategory,phoneNumber,extraInfo, _memberTypeId, password } = req.body;

    let founMember = await Member.findOne({ email: email });
    if (founMember) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newMember: IMember = new Member({
      firstname,
      lastname,
      email,
      ageCategory,
      phoneNumber,
      extraInfo,
      _memberTypeId,
    });

    const member: IMember = await newMember.save();

    const token = this.authService.createToken(member);
    return res.status(200).json({
      firstname: member.firstname,
      lastname: member.lastname,
      email: member.email,
      ageCategory: member.ageCategory,
      phoneNumber: member.phoneNumber,
      extraInfo: member.extraInfo,
      _memberTypeId: member._memberTypeId,
      token: `${token}`,
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
          token: `${token}`,
          strategy: 'local',
          type: user._memberTypeId,
        });
      },
    )(req, res, next);
  };
}

export default MemberController;
