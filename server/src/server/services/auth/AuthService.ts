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
              const club = await Club.findOne({email: email});
              if(!club){
                return done(null, false, { message: 'No member by that email' });
              }
              else {
                return club.comparePassword(password , (error: Error, isMatch: boolean) => {
                  if (!isMatch) {
                    return done(null, false);
                  }
                  return done(null, club);
                });
              }
            }
            
            return member.comparePassword(password , (error: Error, isMatch: boolean) => {
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

  public createToken(member: any): string {
    const payload = {
      id: member._id,
    };
    return jwt.sign(payload, this.config.auth.jwt.secret, {
      expiresIn: 60 * 120,
    });
  }
}

export default AuthService;
