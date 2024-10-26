import { Global, Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { kafkaClientOptions } from "./configuration/kafka.options";
import { consumers } from "./consumers";
import { ProducerService } from "./services/producer.service";

@Global()
@Module({
    imports: [
        ClientsModule.register([
            kafkaClientOptions
        ])
    ],
    controllers: [
        ...consumers
    ],
    exports: [
        ProducerService
    ],
    providers: [
        ProducerService
    ]
})
export class KafkaModule {

}