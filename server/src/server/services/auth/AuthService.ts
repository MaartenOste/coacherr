import { Request, Response, NextFunction } from 'express';
import { default as passport, PassportStatic } from 'passport';
import { default as passportLocal } from 'passport-local';
import { default as passportJwt } from 'passport-jwt';
import { default as jwt } from 'jsonwebtoken';

import { Environment, IConfig } from '../config';
import { IMember, Member, IClub, Club } from '../../models/mongoose';
import { Role } from './auth.types';
import { UnauthorizedError, ForbiddenError } from '../../utilities';

class AuthService {
  private config: IConfig;
  public passport: PassportStatic;
  private LocalStrategy = passportLocal.Strategy;
  private ExtractJwt = passportJwt.ExtractJwt;
  private JwtStrategy = passportJwt.Strategy;

  constructor(config: IConfig) {
    this.config = config;

    this.initializeLocalStrategy();
    this.initializeJwtStrategy();
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    this.passport = passport;
  }

  private initializeLocalStrategy() {
    passport.use(
      new this.LocalStrategy(
        {
          usernameField: 'email',
        },
        async (email: string, password: string, done) => {
          try {
            const member = await Member.findOne({
              email: email,
            });

            if (!member) {
              return done(null, false, { message: 'No member by that email' });
            }
            return member.comparePassword(password , (isMatch: boolean) => {
              if (!isMatch) {
                return done(null, false);
              }
              return done(null, member);
            });
          } catch (error) {
            return done(error, false);
          }
        },
      ),
    );
  }

  initializeJwtStrategy = () => {
    passport.use(
      new this.JwtStrategy(
        {
          secretOrKey: this.config.auth.jwt.secret,
          jwtFromRequest: this.ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (jwtPayload, done) => {
          try {
            const { id } = jwtPayload;

            const member = await Member.findById(id);
            if (!member) {
              return done(null, false);
            }

            return done(null, member);
          } catch (error) {
            return done(error, false);
          }
        },
      ),
    );
  };

  public createToken(member: IMember): string {
    const payload = {
      id: member._id,
    };
    return jwt.sign(payload, this.config.auth.jwt.secret, {
      expiresIn: 60 * 120,
    });
  }
/*
  public checkIsInRole = (...roles: Array<string>) => (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      next(new ForbiddenError());
    }

    const hasRole = roles.find(role => (req.member as IMember).role === role);
    if (!hasRole) {
      next(new UnauthorizedError());
    }

    return next();
  };*/
}

export default AuthService;
