import { Global, HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { ENV } from '../config';

@Global()
@Injectable()
export class LogService {
    async logDiscordWebhook(req: Request, exception: HttpException) {
        const statusCode =
            exception instanceof HttpException ? exception.getStatus() : 500;
        const userAgent = req.get('user-agent') || '';

        await axios.post(ENV.DC_WEBHOOK_URL, {
            embeds: [
                {
                    color: 0xff0000,
                    title: 'Backend Template Log Service',
                    url: 'https://github.com/fatihsen-dev/nestjs-backend-template',
                    fields: [
                        {
                            name: '\u200b',
                            value: '',
                            inline: false,
                        },
                        {
                            name: 'Path:',
                            value: '`' + req.path + '`',
                            inline: true,
                        },
                        {
                            name: 'Method:',
                            value: '`' + req.method + '`',
                            inline: true,
                        },
                        {
                            name: 'Status Code:',
                            value: '`' + statusCode + '`',
                            inline: true,
                        },
                        {
                            name: 'Error Message:',
                            value: '`' + exception.message + '`',
                            inline: true,
                        },
                        {
                            name: 'Request Date:',
                            value:
                                '`' + new Date().toLocaleString('en-EN') + '`',
                            inline: true,
                        },
                        {
                            name: 'Request Source:',
                            value:
                                '`' +
                                ((req.headers.referer || req.headers.origin) ??
                                    userAgent) +
                                '`',
                            inline: true,
                        },
                        {
                            name: 'Request Body:',
                            value:
                                '`' + JSON.stringify(req.body, null, 4) + '`',
                            inline: false,
                        },
                        {
                            name: 'Response Body:',
                            value:
                                '`' +
                                (statusCode === 500
                                    ? 'Internal server error'
                                    : JSON.stringify(
                                          exception.getResponse(),
                                          null,
                                          4,
                                      )) +
                                '`',
                            inline: false,
                        },
                    ],
                },
            ],
        });
    }
}
