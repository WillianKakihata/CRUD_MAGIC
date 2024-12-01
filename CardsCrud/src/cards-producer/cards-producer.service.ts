import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCardsDto } from 'src/Cards/dto/create.cards.dto';

@Injectable()
export class CardsProducerService {
    constructor(@Inject('DECK_IMPORT_SERVICE') private rabbitClient: ClientProxy) {}
    placeCard(cards: CreateCardsDto) {
        this.rabbitClient.emit('deck-import', cards);
        return { message: 'deck importado passou!'}
    }
}
