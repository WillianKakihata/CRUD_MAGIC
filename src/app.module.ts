import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './Cards/cards.module';

@Module({
  imports: [CardsModule,
    MongooseModule.forRoot('mongodb://0.0.0.0/AtividadeMagic'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
