import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './Cards/cards.module';
import { CardsGenerateModule } from './GenerateCards/generate.cards.module';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './Usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/AtividadeMagic'),
    CardsGenerateModule, 
    AuthModule, 
    CardsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
