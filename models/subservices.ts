// import mongoose, { Schema, Document } from 'mongoose';

// export interface IsubService extends Document {
//     name: string;
//     category: string;
//     price: number;
// }

// const subServiceSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Please provide a title for this service'],
//         maxlength: [60, 'Title cannot be more than 60 characters']
//     },
//     category: {
//         type: String,
//         required: [true, 'Please specify the service category'],
//         maxlength: [40, 'Category cannot be more than 40 characters']
//     },
//     price: {
//         type: Number,
//         required: [true, 'Please specify the price'],
//         min: [0, 'Price cannot be negative']
//     }
// }, {
//     timestamps: true,
//     toJSON: { 
//         virtuals: true,
//         transform: function(doc, ret) {
//             ret._id = ret._id.toString();
//             return ret;
//         }
//     }
// });

// export default mongoose.models.subService || mongoose.model<IsubService>('subService', subServiceSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ISubService extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    category: string;
    place: string;
    description: string;
    images: string[];
    price: number;
    duration: string;
    createdAt: Date;
    updatedAt: Date;
}

const subServiceSchema = new Schema<ISubService>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
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
        required: [true, 'Please specify the location of the service'],
        maxlength: [100, 'Location cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the service'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    images: {
        type: [String], // Array of image URLs
        validate: {
            validator: function (arr: string[]) {
                return arr.every(url => typeof url === 'string');
            },
            message: 'Each image must be a string (URL)'
        }
    },
    price: {
        type: Number,
        required: [true, 'Please specify the price'],
        min: [0, 'Price cannot be negative']
    },
    duration: {
        type: String,
        required: [true, 'Please specify the duration of the service'],
        maxlength: [50, 'Duration cannot be more than 50 characters']
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { 
        virtuals: true,
        transform: function (doc, ret) {
            ret._id = ret._id.toString();
            return ret;
        }
    }
});

export default mongoose.models.subService || mongoose.model<ISubService>('subService', subServiceSchema);

