import { Module } from '@nestjs/common';
import { CardsProducerService } from './cards-producer.service';
import { CardsProducerController } from './cards-producer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'DECK_IMPORT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp:localhost:5672'],
        queue: 'deck_import_queue'
      }
    }
  ])],
  controllers: [CardsProducerController],
  providers: [CardsProducerService],
})
export class CardsProducerModule {}
