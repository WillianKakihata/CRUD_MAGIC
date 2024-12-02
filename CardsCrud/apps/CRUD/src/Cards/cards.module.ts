
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Cards, CardsSchema } from './cards.schema';
import { ContextService } from '../Auth/context.service';
import { UsersService } from '../Usuario/usuario.service';
import { UsersModule } from '../Usuario/usuario.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationQueueService } from 'apps/notification_queue/src/notification_queue.service';



@Module({
  imports: [
    MongooseModule.forFeature([{name: Cards.name, schema: CardsSchema}]), 
    ClientsModule.register([
      {
        name: 'DECK_UPDATE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'deck_updates_queue',
          queueOptions: {
            durable: false,
          }
        }
      }
    ]),
    UsersModule
  ],
  controllers: [CardsController],
  providers: [CardsService, ContextService, UsersService,NotificationQueueService],
  exports: [CardsService],
})
export class CardsModule {}
