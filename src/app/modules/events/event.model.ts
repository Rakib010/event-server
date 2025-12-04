import { Schema, model } from "mongoose";
import { EventStatus } from "./event.interface";


const eventSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        location: { type: String, required: true },
        minParticipants: { type: Number, required: true },
        maxParticipants: { type: Number, required: true },
        description: { type: String, required: true },
        profileImage: { type: String, default: "" },
        joiningFee: { type: Number, default: 0, required: true },
        status: {
            type: String,
            enum: Object.values(EventStatus),
            default: EventStatus.OPEN,
        },
        host: {
            type: Schema.Types.ObjectId,
            ref: "User",

        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Event = model("Event", eventSchema);
