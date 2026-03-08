import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiVersion } from '@/types/ApiVersion';

@Controller({
  version: ApiVersion.v1,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth() {
    return this.appService.getHealth();
  }
}
