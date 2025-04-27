import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request, Response } from "express";

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp()
        const response: Response<any, Record<string, any>> = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error'

        const errors = Array.isArray(message)
            ? message
            : typeof message === 'object' && message['message']
                ? Array.isArray(message['message'])
                    ? message['message']
                    : [message['message']]
                : [message]

        response.status(status).json({
            code: status,
            errors,
            data: null
        })
    }
}