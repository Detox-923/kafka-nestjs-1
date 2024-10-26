import { Inject, Injectable } from "@nestjs/common";
import { KAFKA_CLIENT } from "../configuration/kafka.options";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ProducerService {

    constructor(
        @Inject(KAFKA_CLIENT)
        private readonly kafkaClient: ClientKafka
    ) { }

    sendEvent(record: {
        topic: string;
        messsage: any;
    }): void {

        lastValueFrom(this.kafkaClient.emit(record.topic, JSON.stringify(record.messsage)))
        .then((response) => {
            console.log(`Response: ${response}`);
        }).catch((error) => {
            console.log(`Error: ${error}`);
        });

    }

}