import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { SeederService } from './seeder/seeder.service';
import { UserInformationRepository } from './user-information/user-information.repository';
import productsSeeder from './seeder/seeders/product.seed';
import eventSeeder from './seeder/seeders/event.seed';
import userSeeder from './seeder/seeders/user.seed';
import donationSeeder from './seeder/seeders/donations.seed';
import { assistantSeed } from './seeder/seeders/assistant.seed';

@Injectable()
export class AppService {
  constructor(
    private readonly authSv: AuthService,
    private readonly seederSv: SeederService,
    private readonly userInfoRepo: UserInformationRepository,
  ) {}
  async onApplicationBootstrap() {
    const id = await this.authSv.superAdminSeeder();
    await this.seederSv.addProductSeeder(id, productsSeeder);
    await this.seederSv.addEventSeeder(id, eventSeeder);
    await this.seederSv.addUserSeeder(userSeeder);
    const allUsers= await this.userInfoRepo.find()
    await this.seederSv.addDonationSeeder(donationSeeder,allUsers)
    await this.seederSv.addAssistantSeeder(assistantSeed) 
    // const allRelations = await this.userInfoRepo.findOne({
    //   where: { id },
    //   relations: {
    //     user: true,
    //     events: { comments: true },
    //     products: { creator: true },
    //   },
    // });
    // console.log(
    //   'CARDONE => appService, onApplicationBootstrap, ====>>> allRelations',
    //   allRelations,
    // );
  }

  getHello(): string {
    return 'Hello World!';
  }
}
