import { NextFunction, Request, Response } from 'express';
import { IFormation, Formation } from '../../models/mongoose';

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
}

export default FormationController;
