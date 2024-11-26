
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Cards, CardsSchema } from './cards.schema';
import { UsersModule } from 'src/Usuario/usuario.module';
import { UsersService } from 'src/Usuario/usuario.service';
import { ContextService } from 'src/Auth/context.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Cards.name, schema: CardsSchema}]), UsersModule
  ],
  controllers: [CardsController],
  providers: [CardsService, ContextService, UsersService],
  exports: [CardsService],
})
export class CardsModule {}
