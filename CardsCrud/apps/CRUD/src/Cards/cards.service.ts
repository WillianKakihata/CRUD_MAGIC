import { InjectModel } from "@nestjs/mongoose";
import { Cards } from "./cards.schema";
import { Model } from "mongoose";
import { CreateCardsDto } from "./dto/create.cards.dto";
import { UpdateCardsDto } from "./dto/update.cards.dto";
import { ClientRMQ } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";


export class CardsService{
    constructor(@InjectModel(Cards.name) private readonly CardsModel: Model<Cards>,
    @Inject('DECK_UPDATE_SERVICE') private rabbitClient: ClientRMQ) {}

    async create(createCardsDto: CreateCardsDto): Promise<Cards> {
        const cards = new this.CardsModel(createCardsDto)
        this.rabbitClient.emit('deck_updates_queue', cards)
        return await cards.save()
        
    }

    async findAll(): Promise<Cards[]>{
        return await this.CardsModel.find().exec()
    }

    async findById(id: String): Promise<Cards> {
        try {
            return await this.CardsModel.findById(id).exec()
        } catch (error) {
            return null
        }
    }

    async update(id: string, UpdateCardsDto: UpdateCardsDto): Promise<Cards> {
        try {
            this.rabbitClient.emit('deck_update_queue', UpdateCardsDto)
            return await this.CardsModel.findByIdAndUpdate(id, UpdateCardsDto, {new: true});
            
        } catch (error) {
            return null;
        }
    }

    async delete(id: string) {
        try {
            this.rabbitClient.emit('deck_delete_queue', id)
            return await this.CardsModel.findByIdAndDelete(id)
        } catch (error) {
            return null
        }
    }

    
    
}