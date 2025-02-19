import mongoose, { Schema, Document } from 'mongoose';
import User from './User';
import SubService from './subservices';

export interface IServiceRequest extends Document {
  userId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  category: string;
  dateTime: Date;
  duration: string;
  status: 'pending' | 'accepted' | 'rejected';
  serviceProviderId?: mongoose.Types.ObjectId;
  address: string;
  area: string;
}

const serviceRequestSchema = new Schema<IServiceRequest>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: SubService,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  serviceProviderId: {
    type: Schema.Types.ObjectId,
    ref: 'Worker',
  },
  address: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.ServiceRequest || mongoose.model<IServiceRequest>('ServiceRequest', serviceRequestSchema);