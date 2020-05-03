import {
  default as express,
  Application,
  Request,
  Response,
  Router,
} from 'express';
import { IConfig, AuthService, Role } from '../../services';
import {
  ClubController,
  FormationController,
  JoinRequestController,
  MemberController,
  MemberTypeController,
  StatisticController,
} from '../controllers';

class ApiRouter {
  public router: Router;

  private clubController: ClubController;
  private formationController: FormationController;
  private joinRequestController: JoinRequestController;
  private memberController: MemberController;
  private memberTypeController: MemberTypeController;
  private statisticController: StatisticController;

  private config: IConfig;
  private authService: AuthService;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;

    this.router = express.Router();

    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers(): void {
    this.clubController = new ClubController(this.config, this.authService);
    this.formationController = new FormationController();
    this.joinRequestController = new JoinRequestController();
    this.memberController = new MemberController(this.config, this.authService);
    this.memberTypeController = new MemberTypeController();
    this.statisticController = new StatisticController();
  }

  private registerRoutes(): void {
    /*
     * Club routes
     */
    this.router.get('/clubs', this.clubController.index);
    this.router.get('/clubs/:id', this.clubController.show);
    /*
     * Formation routes
     */
    this.router.get('/formations', this.formationController.index);
    this.router.get('/formations/:id', this.formationController.show);
    /*
     * JoinRequest routes
     */
    this.router.get('/joinRequests', this.joinRequestController.index);
    this.router.get('/joinRequests/:id', this.joinRequestController.show);
    /*
     * Member routes
     */
    this.router.get('/members', this.memberController.index);
    this.router.get('/members/:id', this.memberController.show);
    /*
     * Member Type routes
     */
    this.router.get('/memberTypes', this.memberTypeController.index);
    this.router.get('/memberTypes/:id', this.memberTypeController.show);
    /*
     * Statistic routes
     */
    this.router.get('/statistics', this.statisticController.index);
    this.router.get('/statistics/:id', this.statisticController.show);

    /*
     * Post routes
     */
    /*this.router.get('/posts', this.postController.index);
    this.router.get('/posts/create', this.postController.create); // Must be before the route /posts/:id
    this.router.get('/posts/:id', this.postController.show);
    this.router.post('/posts', this.postController.store);
    this.router.get('/posts/:id/edit', this.postController.edit);
    this.router.put('/posts/:id', this.postController.update);
    this.router.delete('/posts/:id', this.postController.destroy);
    /*
     * Users routes
     *//*
    this.router.get('/users', this.userController.index);
    this.router.get('/users/:id', this.userController.show);
    this.router.delete('/users/:id', this.userController.destroy);
    this.router.post('/auth/signin/', this.userController.signInLocal);
    this.router.post('/auth/signup/', this.userController.signupLocal);*/
  }
}

export default ApiRouter;
