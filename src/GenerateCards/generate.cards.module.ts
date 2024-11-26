import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsService } from 'src/Cards/cards.service';
import { CardsGenerateService } from './generate.cards.service';
import { Cards, CardsSchema } from 'src/Cards/cards.schema';
import { CardsGenerateController } from './generate.cards.controller';
import { UsersModule } from 'src/Usuario/usuario.module';
import { ContextService } from 'src/Auth/context.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cards.name, schema: CardsSchema }]), UsersModule
  ],
  controllers: [CardsGenerateController],
  providers: [CardsService, CardsGenerateService, ContextService],
  exports: [CardsGenerateService],
})
export class CardsGenerateModule {}
