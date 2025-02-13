import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    _id: mongoose.Types.ObjectId;
    workerId: string;
    title: string;
    category: string;
    place: string;
    description: string;
    images: string[];
    price: number;
    duration: string;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema({
    workerId: {
        type: String,
        required: true,
        ref: 'Worker'
    },
    title: {
        type: String,
        required: [true, 'Please provide a title for this service'],
        maxlength: [60, 'Title cannot be more than 60 characters']
    },
    category: {
        type: String,
        required: [true, 'Please specify the service category'],
        maxlength: [40, 'Category cannot be more than 40 characters']
    },
    place: {
        type: String,
        required: [true, 'Please specify the service location']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    images: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: [true, 'Please specify the price'],
        min: [0, 'Price cannot be negative']
    },
    duration: {
        type: String,
        required: [true, 'Please specify the duration']
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            ret._id = ret._id.toString();
            return ret;
        }
    }
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

