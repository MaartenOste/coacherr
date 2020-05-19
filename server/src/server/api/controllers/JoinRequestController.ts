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

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        memberId,
        clubId,
      } = req.body;

      let foundRequest = await JoinRequest.findOne({ _memberId: memberId });
      if (foundRequest) {
        return res.status(403).json({ error: 'User had already send a request' });
      }

      const newJoinRequest: IJoinRequest = new JoinRequest({
        _memberId: memberId,
        _clubId: clubId,
      });

      const joinRequest: IJoinRequest = await newJoinRequest.save();

      return res.status(200).json(joinRequest);
    } catch (err) {
      next(err);
    }
  };

    destroy = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const {
        memberId,
      } = req.body;
  
      let foundRequest = await JoinRequest.findOne({ _memberId: memberId });
      if (foundRequest) {
        await JoinRequest.deleteOne({ _memberId: memberId });
        return res.status(200).json({ message: 'JoinRequest deleted succesfully' });
      }else {
        return res.status(403).json({ error: 'JoinRequest not found' });
      }
  };

}

export default JoinRequestController;
