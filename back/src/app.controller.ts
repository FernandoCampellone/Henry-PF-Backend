import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hello World!')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
