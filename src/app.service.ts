import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    // this.predictableError()
    // this.unpredictableError()
    return 'Hello World!'
  }

  private predictableError() {
    throw 2000
  }

  private unpredictableError(arr?: number[]) {
    return arr.join()
  }
}
