import { MicroserviceOptions, Transport, ClientProviderOptions } from "@nestjs/microservices";
import * as config from 'config';
import { Partitioners } from "kafkajs";

export const KAFKA_CLIENT = 'KAFKA_CLIENT';

export const kafkaOptions: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: config.get<string[]>('configuration.kafka.brokers'),
            clientId: config.get<string>('configuration.kafka.clientId'),
            connectionTimeout: 1000,
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        },
        consumer: {
            allowAutoTopicCreation: true,
            groupId: config.get<string>('configuration.kafka.consumer.groupId'),
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        },
        producer: {
            createPartitioner: Partitioners.DefaultPartitioner,
            allowAutoTopicCreation: true,
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        },
        subscribe: {
            fromBeginning: false
        }
    }
}

export const kafkaClientOptions: ClientProviderOptions = {
    name: KAFKA_CLIENT,
    ...kafkaOptions
};