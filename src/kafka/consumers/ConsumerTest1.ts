import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";


@Controller()
export class ConsumerTest1 {


    @EventPattern("consumer-test1-topic")
    handle(
        @Payload()
        message: any,
        @Ctx()
        context: KafkaContext
    ): void {
        console.log("ConsumerTest1");
        console.log(`Message: ${JSON.stringify(message)}`);
        console.log(`Partition: ${context.getPartition()}`);
        console.log(`Topic: ${context.getTopic()}`);

       const {
            value,
            offset,
            headers
        } = context.getMessage();

        console.log(`Value: ${value.toString()}`);
        console.log(`Offset: ${offset}`);
        console.log(`Headers: ${JSON.stringify(headers)}`);
        
    }

}