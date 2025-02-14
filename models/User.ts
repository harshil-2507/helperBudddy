// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User document interface
export interface IUser extends Document {
  _id : mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  area: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  interestedCategory?: string[]; // Add this line
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Define the schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    area: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String }, // For email verification
    otpExpires: { type: Date }, // OTP expiration time
    interestedCategory: { type: [String], default: [] }, // Add this line
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model already exists
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// Add this line to export the IUser interface as a type
export type User = IUser;

export default User;