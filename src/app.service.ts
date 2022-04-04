import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    // this.expectableError()
    // this.unexpectableError()
    return 'Hello World!'
  }

  private expectableError() {
    throw 2000
  }

  private unexpectableError(arr?: number[]) {
    return arr.join()
  }
}
