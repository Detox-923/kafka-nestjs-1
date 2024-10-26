import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/services/producer.service';

@Injectable()
export class AppService {

  constructor(
    private readonly producerService: ProducerService
  ) {

  }

  getHello(): string {

    this.producerService.sendEvent({
      topic: 'producer-test1-topic',
      messsage: {
        data: 'Hello World!'
      }
    });

    return 'Hello World!';
  }
}
