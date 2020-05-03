import { NextFunction, Request, Response } from 'express';
import { IFormation, Formation } from '../../models/mongoose';

class FormationController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let formations = await Formation.find()
          .sort({ _createdAt: -1 })
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
        .exec();
      return res.status(200).json(formation);
    } catch (err) {
      next(err);
    }
  };
}

export default FormationController;
