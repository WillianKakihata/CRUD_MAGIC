import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios, { AxiosResponse } from "axios";
import { Model } from "mongoose";
import { ContextService } from "src/Auth/context.service";
import { Cards } from "src/Cards/cards.schema";
import { CreateCardsDto } from "src/Cards/dto/create.cards.dto";

@Injectable()
export class CardsGenerateService {
    constructor(
    @InjectModel(Cards.name) private readonly cardsModel: Model<Cards>,
    private readonly contextService: ContextService
) {}

async generate(): Promise<CreateCardsDto> {
    const commander = await this.obterComandante();
    const commanderName = this.obterNomeCarta(commander);
    const otherCards = await this.obterOutrasCartas(commander.colors || []);
    const cardNames = otherCards.map(this.obterNomeCarta);
    const idUser = this.contextService.getUserId();
    const newDeck = new this.cardsModel({
     cardCommander: commanderName,
     cards: cardNames,
     idUser: idUser
    });

    await newDeck.save();  
    return {
      cardCommander: commanderName,
      cards: cardNames,
      idUser: idUser
    };
  }

private async obterComandante(): Promise<any> {
    const resposta: AxiosResponse = await axios.get(
      'https://api.scryfall.com/cards/random?q=is%3Acommander',
    );
    const cartasComandante = resposta.data;
    return cartasComandante;
  }

  private async obterOutrasCartas(cores: string[]): Promise<any[]> {
    const consultaCores = cores.join(',');
    const resposta: AxiosResponse = await axios.get(
      `https://api.magicthegathering.io/v1/cards?colors=${consultaCores}&supertypes!=legendary`,
    );
    const cartasNaoLegendarias = resposta.data.cards;
    
    return this.obterCartasAleatorizadas(cartasNaoLegendarias, 99);
  }

  private obterNomeCarta(carta: any): string {
    return carta.name;
  }

  private async obterCartasAleatorizadas(cartas: any[], quantidade: number): Promise<any[]> {
    if (cartas.length < quantidade) {
      throw new Error("Não há cartas suficientes disponíveis para atender à solicitação");
    }

    const cartasUnicas = new Set();
    const cartasEmbaralhadas = this.embaralharArray(cartas);

    for (const carta of cartasEmbaralhadas) {
      if (cartasUnicas.size >= quantidade) {
        break;
      }
      const nomeCarta = this.obterNomeCarta(carta);
      if (!cartasUnicas.has(nomeCarta)) {
        cartasUnicas.add(nomeCarta);
      }
    }

    return Array.from(cartasUnicas).map(nome => cartas.find(carta => this.obterNomeCarta(carta) === nome));
  }

  private embaralharArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }







}