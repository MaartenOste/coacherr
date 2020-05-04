import { NextFunction, Request, Response } from 'express';
import { IJoinRequest, JoinRequest } from '../../models/mongoose';

class JoinRequestController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let joinRequests = await JoinRequest.find()
        .sort({ _createdAt: -1 })
        .exec();

      return res.status(200).json(joinRequests);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const joinRequest = await JoinRequest.findById(id).exec();
      return res.status(200).json(joinRequest);
    } catch (err) {
      next(err);
    }
  };
}

export default JoinRequestController;
