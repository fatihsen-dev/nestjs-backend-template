import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from '../services/log.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    @Inject(LogService) logService: LogService;

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        this.logService.logDiscordWebhook(request, exception);

        response.status(status).json(
            status === 500
                ? {
                      message: 'Internal server error',
                      error: 'Internal server error',
                      status,
                  }
                : exception.getResponse(),
        );
    }
}
