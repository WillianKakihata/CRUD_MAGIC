import { InjectModel } from "@nestjs/mongoose";
import { Cards } from "./cards.schema";
import { Model } from "mongoose";
import { CreateCardsDto } from "./dto/create.cards.dto";
import { UpdateCardsDto } from "./dto/update.cards.dto";
import { NotificationQueueService } from "apps/notification_queue/src/notification_queue.service";


export class CardsService{
    constructor(@InjectModel(Cards.name) private readonly CardsModel: Model<Cards>,
    private readonly notificationQueueService: NotificationQueueService,
) {}

    async create(createCardsDto: CreateCardsDto): Promise<Cards> {
        const cards = new this.CardsModel(createCardsDto)
        this.notificationQueueService.defaultNestJs(createCardsDto);
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

    async update(id: string, updateCardsDto: UpdateCardsDto): Promise<Cards> {
        const updatedCard = await this.CardsModel.findByIdAndUpdate(id, updateCardsDto, { new: true });
    
        if (updatedCard) {
          this.notificationQueueService.defaultNestJs(updateCardsDto);
        }
    
        return updatedCard;
      }

    async delete(id: string) {
        try {
            return await this.CardsModel.findByIdAndDelete(id)
        } catch (error) {
            return null
        }
    }

    
    
}