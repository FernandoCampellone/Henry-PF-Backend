import { Injectable } from '@nestjs/common';

import { UserInformationRepository } from './user-information.repository';
import { User } from 'src/users/entities/user.entity';
import { UserInformation } from './entities/user-information.entity';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UserInformationService {
  constructor(
    private readonly dsource: DataSource,
    private readonly userInfoRepo: UserInformationRepository,
  ) {}

  async createUserInformationTable(user: User, manager: EntityManager) {
    const userInformation = this.userInfoRepo.create({ user: user });
    const savedUserInformationTable = await this.userInfoRepo.saveTable(
      userInformation,
      manager,
    );
    if (!savedUserInformationTable) {
      throw new Error('Could not save userInformation');
    }
    return savedUserInformationTable;
  }
}
