import { NextFunction, Request, Response } from 'express';
import { IClub, Club } from '../../models/mongoose';

import { AuthService, IConfig } from '../../services';
import { NotFoundError } from '../../utilities';

class ClubController {
  private authService: AuthService;
  private config: IConfig;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let clubs = await Club.find()
        .sort({ _createdAt: -1 })
        .exec();

      return res.status(200).json(clubs);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const club = await Club.findById(id).exec();
      return res.status(200).json(club);
    } catch (err) {
      next(err);
    }
  };

  signupLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { email, name, clubnumber, phoneNumber, password } = req.body;

    let founMember = await Club.findOne({ email: email });
    if (founMember) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newClub: IClub = new Club({
      email,
      name,
      clubnumber,
      phoneNumber,
    });

    const club: IClub = await newClub.save();

    const token = this.authService.createToken(club);
    return res.status(200).json({
      email: club.email,
      name: club.name,
      clubnumber: club.clubNumber,
      phoneNumber: club.phoneNumber,
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
        });
      },
    )(req, res, next);
  };
}

export default ClubController;
