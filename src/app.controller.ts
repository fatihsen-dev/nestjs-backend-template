import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    @Inject(AppService) appService: AppService;

    @Get()
    getHello() {
        return this.appService.getHello();
    }
}
