import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_META } from '../error'

interface ErrorFormat {
  statusCode: number
  message: string
  error?: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let errorFormat
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (!isNaN(+exception)) {
      errorFormat = errorFormatter(+exception)
    } else if (exception instanceof HttpException) {
      errorFormat = exception.getResponse()
    } else {
      errorFormat = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error'
      }
    }
    response
      .status(errorFormat.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(errorFormat)
  }
}

const errorFormatter = (code: number): ErrorFormat => {
  const { message: m, statusCode: s } = ERROR_META[+code]
  return { statusCode: s, message: m }
}
