import { Controller, Get } from '@nestjs/common';
import { NotificationQueueService } from './notification_queue.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { cardsDto } from 'apps/rmq-process/src/deckImport_queue/cards.dto';

@Controller()
export class NotificationQueueController {
  constructor(private readonly notificationQueueService: NotificationQueueService) {}

  @EventPattern('deck_updates_queue')
  async defaultNestJs(@Payload() cards: cardsDto){
    return this.notificationQueueService.defaultNestJs(cards);
  }

  @EventPattern('deck_generate_queue')
  async generateAplication(@Payload() data: any) {
    return this.notificationQueueService.generateNotification();
  }

  @EventPattern('deck_delete_queue')
  async DeleteAplication(@Payload() data: any) {
    return this.notificationQueueService.deleteNotification();
  }

  @EventPattern('deck_update_queue')
  async AtualizationAplication(@Payload() data: any) {
    return this.notificationQueueService.updateeNotification();
  }


  
}
