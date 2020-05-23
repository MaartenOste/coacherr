import { NextFunction, Request, Response } from 'express';
import { IJoinRequest, JoinRequest } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class JoinRequestController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let joinRequests = await JoinRequest.find()
        .populate('member')
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
      const joinRequest = await JoinRequest.findById(id)
      .populate('member')
      .exec();
      return res.status(200).json(joinRequest);
    } catch (err) {
      next(err);
    }
  };

  deleteJoinRequestOfMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const joinRequest = await JoinRequest.findOneAndDelete({_memberId: id}).exec();
      return res.status(200).json(joinRequest);
    } catch (err) {
      next(err);
    }
  };

  joinRequestsForClub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const joinRequest = await JoinRequest.find({_clubId: id})
      .populate('member')
      .populate({
        path : '_memberId',
        populate : {
          path : '_memberTypeId'
        }
      })
      .exec();
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
      const { id } = req.params;
      
      try{
        let joinRequest = null;

        let { mode } = req.query;
        switch (mode) {
          case 'delete':
          default:
            joinRequest = await JoinRequest.findOneAndRemove({ _id: id });
            break;
          case 'softdelete':
            joinRequest = await JoinRequest.findByIdAndUpdate(
              { _id: id },
              { _deletedAt: Date.now() },
            );
            break;
          case 'softundelete':
            joinRequest = await JoinRequest.findByIdAndUpdate(
              { _id: id },
              { _deletedAt: null },
            );
            break;
        }
        if (!joinRequest) {
          throw new NotFoundError();
        } else {
          return res.status(200).json({
            message: `Successful ${mode} the joinRequest with id: ${id}!`,
            joinRequest,
            mode,
          });
        }
      } catch (err) {
        next(err);
      }

  };

}

export default JoinRequestController;
