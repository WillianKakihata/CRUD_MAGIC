import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/Auth/auth.guard";
import { CreateCardsDto } from "src/Cards/dto/create.cards.dto";
import { CardsGenerateService } from "./generate.cards.service";
import { CardsService } from "src/Cards/cards.service";

@UseGuards(AuthGuard)
@Controller('cards/generate')
export class CardsGenerateController {
    constructor(private readonly CardsGenerateService: CardsGenerateService, private readonly CardsService: CardsService) {}

    @Post()
    async createCards(): Promise<CreateCardsDto> {
        return this.CardsGenerateService.generate();
      }
}