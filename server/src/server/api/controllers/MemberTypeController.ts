import { NextFunction, Request, Response } from 'express';
import { IMemberType, MemberType } from '../../models/mongoose';

class MemberTypeController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let memberTypes = await MemberType.find()
        .sort({ _createdAt: -1 })
        .exec();

      return res.status(200).json(memberTypes);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const memberType = await MemberType.findById(id).exec();
      return res.status(200).json(memberType);
    } catch (err) {
      next(err);
    }
  };

  memberTypesByName= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const memberType = await MemberType.find().where('name', name).exec();

      return res.status(200).json(memberType);
    } catch (err) {
      next(err);
    }
  };
}

export default MemberTypeController;
