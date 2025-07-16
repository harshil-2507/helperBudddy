import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  area: string;
  address: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  interestedCategory?: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  walletCoins: number;
  referralCode?: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, maxlength: 200 },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    interestedCategory: { type: [String], default: [] },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    walletCoins: { type: Number, default: 0 },
    referralCode: { type: String },
  },
  { timestamps: true }
);

// Add password hashing middleware : triggered when .save()function is being called in api of signup
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();//if its already hashed then move ahead
  const salt = await bcrypt.genSalt(10);//random string(lets call it as salt)gets added as cost factor of 10(std one in industry)(shows security and time it takes to hash)


// bcrypt.hash(password, salt) ensures:
// Password is not reversible.
// Even brute force attacks take time due to salting & cost.
// Why bcrypt?
// Secure against dictionary & rainbow table attacks.
// Widely trusted & used in production systems.
// Auto-handles salting internally as well.

  this.password = await bcrypt.hash(this.password, salt);
  next();//proceed
});

// Add password matching method
userSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export type UserType = IUser;

export default User;