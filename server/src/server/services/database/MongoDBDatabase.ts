import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
  IClub,
  Club,
  IFormation,
  Formation,
  IJoinRequest,
  JoinRequest,
  IMember,
  Member,
  IMemberType,
  MemberType,
  IStatistic,
  Statistic,
} from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  private clubs: Array<IClub>;
  private formations: Array<IFormation>;
  private joinRequests: Array<IJoinRequest>;
  private members: Array<IMember>;
  private memberTypes: Array<IMemberType>;
  private statics: Array<IStatistic>;

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

    this.clubs = [];
    this.formations = [];
    this.joinRequests = [];
    this.members = [];
    this.memberTypes = [];
    this.statics = [];
  }

  public connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongoose
        .connect(this.config.mongoDBConnection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(data => {
          this.db = mongoose.connection;

          this.logger.info('Connected to the mongodb database', {});

          resolve(true);
        })
        .catch(error => {
          this.logger.error("Can't connect to the database", error);

          reject(error);
        });
    });
  }

  public disconnect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .close(true)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          this.logger.error("Can't disconnect the database", error);

          reject(error);
        });
    });
  }

  private clubCreate = async (
    name: string,
    clubNumber: number,
    password: string,
    email: string,
    phoneNumber: string,
  ) => {
    const clubDetail = {
      email,
      localProvider: {
        password,
      },
      name,
      clubNumber,
      phoneNumber,
    };
    const club: IClub = new Club(clubDetail);

    try {
      const createdClub = await club.save();
      this.clubs.push(createdClub);

      this.logger.info(`Club created with id: ${createdClub._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private createClubs = async () => {
    const promises = [];

    promises.push(
      this.clubCreate(
        'FC NMD',
        99999,
        'yeetskeet',
        'maarten.oste@gmail.com',
        '+324xx/xx.xx.xx',
      ),
    );

    /*for (let i = 0; i < 30; i++) {
      promises.push(
        this.clubCreate(
          `FC ${faker.address.city()}`,
          faker.random.number(99999),
          'yeetskeet',
          faker.internet.email(),
          faker.phone.phoneNumber(),
        ),
      );
    }*/
    return await Promise.all(promises);
  };

  private memberTypeCreate = async (name: string) => {
    const memberTypeDetail = {
      name,
    };
    const memberType: IMemberType = new MemberType(memberTypeDetail);

    try {
      const createdMemberType = await memberType.save();
      this.memberTypes.push(createdMemberType);

      this.logger.info(
        `MemberType created with id: ${createdMemberType._id}`,
        {},
      );
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private createMemberTypes = async () => {
    const promises = [];

    promises.push(
      this.memberTypeCreate('Player'),
      this.memberTypeCreate('Coach'),
    );
    return await Promise.all(promises);
  };

  private memberCreate = async (
    firstname: string,
    lastname: string,
    email: string,
    ageCategory: string,
    phoneNumber: string,
    extraInfo: Object,
    _clubId: IClub['_id'],
    _memberTypeId: Array<IMemberType['id']>,
  ) => {
    const memberDetail = {
      firstname,
      lastname,
      email,
      ageCategory,
      phoneNumber,
      extraInfo,
      _clubId,
      _memberTypeId,
    };
    const member: IMember = new Member(memberDetail);

    try {
      const createdMember = await member.save();
      this.members.push(createdMember);

      this.logger.info(`Member created with id: ${createdMember._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private createMembers = async () => {
    const promises = [];
    const agecategories = [
      'U7',
      'U9',
      'U11',
      'U13',
      'U15',
      'U17',
      'U19',
      'U21',
      'Second-Team',
      'First-Team',
    ];
    const positions = ['goalkeeper', 'defender', 'midfielder', 'attacker'];
    const feet = ['left', 'right'];
    for (let j = 0; j < this.clubs.length; j++) {
      for (let k = 0; k < agecategories.length; k++) {
        for (let i = 0; i < 15; i++) {
          const extraI = {
            position: positions[faker.random.number(positions.length - 1)],
            foot: feet[faker.random.number(feet.length - 1)],
          };
          const fn = faker.name.firstName();
          const ln = faker.name.lastName();
          promises.push(
            this.memberCreate(
              fn,
              ln,
              faker.internet.email(fn, ln),
              agecategories[k],
              faker.phone.phoneNumber(),
              extraI,
              this.clubs[j]._id,
              [this.memberTypes[0]._id],
            ),
          );
        }
        const fn = faker.name.firstName();
        const ln = faker.name.lastName();
        promises.push(
          this.memberCreate(
            fn,
            ln,
            faker.internet.email(fn, ln),
            agecategories[k],
            faker.phone.phoneNumber(),
            {},
            this.clubs[j]._id,
            [this.memberTypes[1]._id],
          ),
        );
      }
    }

    return await Promise.all(promises);
  };

  private createMembersWithoutClub = async () => {
    const promises = [];
    const agecategories = [
      'U7',
      'U9',
      'U11',
      'U13',
      'U15',
      'U17',
      'U19',
      'U21',
      'Second Team',
      'First Team',
    ];
    const positions = ['doelman', 'verdediger', 'middevelder', 'aanvaller'];
    const feet = ['left', 'right'];

    for (let k = 0; k < agecategories.length; k++) {
      for (let i = 0; i < faker.random.number(3); i++) {
        const extraI = {
          position: positions[faker.random.number(positions.length - 1)],
          foot: feet[faker.random.number(feet.length - 1)],
        };
        const fn = faker.name.firstName();
        const ln = faker.name.lastName();
        promises.push(
          this.memberCreate(
            fn,
            ln,
            faker.internet.email(fn, ln),
            agecategories[k],
            faker.phone.phoneNumber(),
            extraI,
            null,
            [this.memberTypes[0]._id],
          ),
        );
      }
      const fn = faker.name.firstName();
      const ln = faker.name.lastName();
      promises.push(
        this.memberCreate(
          fn,
          ln,
          faker.internet.email(fn, ln),
          agecategories[k],
          faker.phone.phoneNumber(),
          {},
          null,
          [this.memberTypes[1]._id],
        ),
      );
    }
    return await Promise.all(promises);
  };

  private joinRequestCreate = async (
    _clubId: IClub['_id'],
    _memberId: IMember['_id'],
  ) => {
    const joinRequestDetail = {
      _clubId,
      _memberId,
    };

    const joinRequest: IJoinRequest = new JoinRequest(joinRequestDetail);

    try {
      const createdJoinRequest = await joinRequest.save();
      this.joinRequests.push(createdJoinRequest);

      this.logger.info(
        `Join request created with id: ${createdJoinRequest._id}`,
        {},
      );
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private createJoinRequests = async () => {
    const promises = [];

    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i]._clubId == null) {
        promises.push(
          this.joinRequestCreate(
            this.clubs[faker.random.number(this.clubs.length - 1)]['_id'],
            this.members[i]['_id'],
          ),
        );
      }
    }

    return await Promise.all(promises);
  };

  private formationCreate = async (
    structure: String,
    ageCategory: String,
    _coachId: IMember['_id'],
    _playersIds: Array<IMember>,
  ) => {
    const formationDetail = {
      structure,
      ageCategory,
      _coachId,
      _playersIds,
    };
    const formation: IFormation = new Formation(formationDetail);

    try {
      const createdFormation = await formation.save();
      this.formations.push(createdFormation);

      this.logger.info(
        `Formation created with id: ${createdFormation._id}`,
        {},
      );
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private getCoachIdFromClubAndAgeCategory = (
    clubId: IClub['_id'],
    ageCategory: String,
  ) => {
    for (let i = 0; i < this.members.length; i++) {
      if (
        this.members[i]['_clubId'] == clubId &&
        this.members[i]['ageCategory'] == ageCategory &&
        this.members[i]['_memberTypeId'].toString() ==
          this.memberTypes[1]['_id'].toString()
      ) {
        return this.members[0]['_id'];
      }
    }
  };

  private getPlayerIdsFromClubAndAgeCategory = (
    clubId: String,
    ageCategory: String,
  ) => {
    let players = [];
    for (let i = 0; i < this.members.length; i++) {
      if (
        this.members[i]['_clubId'] == clubId &&
        this.members[i]['ageCategory'] == ageCategory &&
        this.members[i]['_memberTypeId'].toString() ==
          this.memberTypes[0]['_id'].toString()
      ) {
        players.push(this.members[i]['_id']);
      }
    }
    return players;
  };

  private createFormations = async () => {
    const promises = [];
    const structures = [
      '4-3-3',
      '4-5-1',
      '4-4-2',
      '3-4-4',
      '3-5-2',
      '5-3-2',
      '5-2-3',
    ];
    const agecategories = [
      'U7',
      'U9',
      'U11',
      'U13',
      'U15',
      'U17',
      'U19',
      'U21',
      'Second Team',
      'First Team',
    ];
    for (let j = 0; j < this.clubs.length; j++) {
      for (let k = 0; k < agecategories.length; k++) {
        for (let i = 0; i < 3; i++) {
          promises.push(
            this.formationCreate(
              structures[faker.random.number(structures.length - 1)],
              agecategories[k],
              this.getCoachIdFromClubAndAgeCategory(
                this.clubs[j]['_id'].toString(),
                agecategories[k],
              ),
              this.getPlayerIdsFromClubAndAgeCategory(
                this.clubs[j]['_id'].toString(),
                agecategories[k],
              ),
            ),
          );
        }
      }
    }

    return await Promise.all(promises);
  };

  private statisticCreate = async (
    score: string,
    _formationId: IFormation['_id'],
  ) => {
    const statisticDetail = {
      score,
      _formationId,
    };
    const statistic: IStatistic = new Statistic(statisticDetail);

    try {
      const createdStatistic = await statistic.save();
      this.statics.push(createdStatistic);

      this.logger.info(
        `Statistic created with id: ${createdStatistic._id}`,
        {},
      );
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private createStatistics = async () => {
    const promises = [];

    for (let i = 0; i < this.formations.length; i++) {
      const score = `${faker.random.number(5)}-${faker.random.number(5)}`;

      promises.push(this.statisticCreate(score, this.formations[i]['_id']));
    }

    return await Promise.all(promises);
  };

  public seed = async () => {
    this.clubs = await Club.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createClubs();
        }
        return Club.find().exec();
      });

    this.memberTypes = await MemberType.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createMemberTypes();
        }
        return MemberType.find().exec();
      });

    this.members = await Member.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createMembers();
          await this.createMembersWithoutClub();
        }
        return Member.find().exec();
      });

    this.joinRequests = await JoinRequest.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createJoinRequests();
        }
        return JoinRequest.find().exec();
      });

    this.formations = await Formation.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createFormations();
        }
        return Formation.find().exec();
      });

    this.statics = await Statistic.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createStatistics();
        }
        return Statistic.find().exec();
      });
  };
}

export default MongoDBDatabase;
