import { NextFunction, Request, Response } from 'express';
import { IFormation, Formation } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class FormationController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let formations = await Formation.find()
        .sort({ date: -1 })
        .populate('players')
        .exec();

      return res.status(200).json(formations);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const formation = await Formation.findById(id)
      .populate('players')
      .populate('club')
      .exec();
      return res.status(200).json(formation);
    } catch (err) {
      next(err);
    }
  };

  formationsByClubAndAge = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clubId, age } = req.params;
      const formation = await Formation.find({_clubId: clubId, ageCategory:age})
      .sort({ date: -1 });
      return res.status(200).json(formation);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id } = req.params;

    try{
    const formationUpdate = {
      _id: id,
      structure: req.body.structure,
      ageCategory: req.body.ageCategory,
      _coachId: req.body._coachId,
      _playersIds: req.body._playersIds,
      _clubId: req.body._clubId,
      date: req.body.date
    }

    const formation = await Formation.findOneAndUpdate({_id: id}, formationUpdate, {
      new: true
    }).exec();


    if (!formation) {
      throw new NotFoundError();
    }
    return res.status(200).json(formation);
  } catch (err) {
    next(err);
  }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newFormtation: IFormation = new Formation({
        structure: req.body.structure,
        ageCategory: req.body.ageCategory,
        _coachId: req.body._coachId,
        _playersIds: req.body._playersIds,
        _clubId: req.body._clubId,
        date: req.body.date
      });
      console.log(newFormtation);
      
      const joinRequest: IFormation = await newFormtation.save();
      console.log(joinRequest);
      
      return res.status(200).json(joinRequest);
    } catch (err) {
      next(err);
    }
  };

    destroy = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const {
        formationId,
      } = req.body;
  
      let foundFormation = await Formation.findById(formationId);
      if (foundFormation) {
        await Formation.deleteOne({ _id: formationId });
        return res.status(200).json({ message: 'Formation deleted succesfully' });
      }else {
        return res.status(403).json({ error: 'Formation not found' });
      }
  };
}

export default FormationController;
