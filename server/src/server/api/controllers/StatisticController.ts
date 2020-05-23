import { NextFunction, Request, Response } from 'express';
import { IStatistic, Statistic } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

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
  statisticsFromFormation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const statistic = await Statistic.findOne().where('_formationId', id);
      return res.status(200).json(statistic);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newStatistic: IStatistic = new Statistic({
        _formationId: req.body._formationId,
        score: req.body.score,
      });

      const statistic: IStatistic = await newStatistic.save();
      return res.status(200).json(statistic);
    } catch (err) {
      next(err);
    }
  };


  update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id } = req.params;

    try{
    const statisticUpdate = {
      score: req.body.score,
      _formationId: req.body._formationId,
      _modifiedAt: new Date().getTime()
    }

    const statistic = await Statistic.findOneAndUpdate({_id: id}, statisticUpdate, {
      new: true
    }).exec();
    if (!statistic) {
      throw new NotFoundError();
    }
    return res.status(200).json(statistic);
  } catch (err) {
    next(err);
  }
  };

}

export default StatisticController;
