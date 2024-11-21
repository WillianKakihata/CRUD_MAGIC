
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Cards, CardsSchema } from './cards.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Cards.name, schema: CardsSchema}]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
