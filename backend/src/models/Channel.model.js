import mongoose ,{Schema} from "mongoose";

const channelSchema = new Schema(
    {
        name: String
    },
    {
        timestamps: true
    }
)

export const Channel = mongoose.model("Channel", channelSchema);