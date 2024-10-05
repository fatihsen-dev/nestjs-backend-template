import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
    CannotCreateEntityIdMapError,
    EntityNotFoundError,
    QueryFailedError,
} from 'typeorm';

@Catch(HttpException, QueryFailedError, EntityNotFoundError)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = exception.message;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.constructor) {
            case QueryFailedError:
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = exception.message;
                break;
            case EntityNotFoundError:
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = exception.message;
                break;
            case CannotCreateEntityIdMapError:
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = exception.message;
                break;
            default:
                message = exception?.getResponse
                    ? (exception?.getResponse() as any).message
                    : exception.message;
                status = exception?.getStatus ? exception.getStatus() : status;
        }

        response.status(status).json({
            message,
            status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        });
    }
}
