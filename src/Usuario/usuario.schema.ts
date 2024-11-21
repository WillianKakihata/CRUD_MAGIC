import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserType } from "./user.type.enum";

@Schema()
export class User extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
        _id: mongoose.Schema.Types.ObjectId;

    @Prop()
        username: string;

    @Prop()
        password: string;

    @Prop({ type: [String], enum: UserType, default: [UserType.User] }) 
        roles: UserType[];

    @Prop()
        name: string;

    @Prop()
        email: string;

    @Prop()
        cardsId: string;
}

export const UserShema = SchemaFactory.createForClass(User);