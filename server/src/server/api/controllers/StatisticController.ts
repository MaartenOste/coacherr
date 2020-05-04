import { NextFunction, Request, Response } from 'express';
import { IStatistic, Statistic } from '../../models/mongoose';

class StatisticController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let statistics = await Statistic.find()
        .sort({ _createdAt: -1 })
        .exec();

      return res.status(200).json(statistics);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const statistic = await Statistic.findById(id).exec();
      return res.status(200).json(statistic);
    } catch (err) {
      next(err);
    }
  };
}

export default StatisticController;
