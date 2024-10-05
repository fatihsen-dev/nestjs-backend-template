import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestService } from './common/services/request.service';

@Controller()
export class AppController {
    @Inject(AppService) appService: AppService;
    @Inject(RequestService) requestService: RequestService;

    @Get()
    getHello() {
        return this.appService.getHello();
    }
}
