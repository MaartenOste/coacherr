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
        .sort({ name: -1 })
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

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id } = req.params;

    try{
    const clubUpdate = {
      _id: id,
      email: req.body.email,
      localProvider: req.body.localProvider,
      _modifiedAt: new Date().getTime(),
      name: req.body.name,
      clubNumber: req.body.clubNumber,
      phoneNumber: req.body.phoneNumber,
      slug: req.body.slug
    }

    const club = await Club.findOneAndUpdate({_id: id}, clubUpdate, {
      new: true
    }).exec();


    if (!club) {
      throw new NotFoundError();
    }
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
    const {
      email,
      password,
      name,
      phoneNumber,
    } = req.body;

    let foundClub = await Club.findOne({ email: email });
    if (foundClub) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newClub: IClub = new Club({
      email: email,
      localProvider:{
        password: password,
      },
      name: name,
      phoneNumber: phoneNumber,
    });

    const club: IClub = await newClub.save();

    const token = this.authService.createToken(club);
    return res.status(200).json({
      email: club.email,
      id: club._id,
      token: `${token}`,
      strategy: 'local',
      type: 'Club',
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
          type: 'Club',
        });
      },
    )(req, res, next);
  };
}

export default ClubController;
