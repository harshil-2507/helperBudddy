// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    //here there is flow found while testing: first of all -> if user sign yp and for some readon he/she close the site and did not verified , then when comes to login part it will say that user is not verified and if he/she try to verify, he/she must sign up again that is when it will indicate that user already exists!! its an inf loop, user will not able to login with the same email id again ever..this is the flow and can be solved using two ways:
    // 1st thought) relaxation of verification on login, later user can verified from their dashboard
    //2nd thought) design the flow such that when user sign ups and if he/she is found already exist in database then extra check one more condition like whether he/she iss verified or not already, by their isVerifed attribute = true or not, if it false then we can call otp verification form component there only instead of gving user exist error, if it is found by emeail and also verified then you can come with message that its already exist and can not sign up  error message -> its a more feasible solution approach(just one conditional check more)
    
    if (!user.isVerified) {//as per first soln approach, remove it
        //third thought: we can integrate second approach here directly that is the best one!!
      return NextResponse.json({ message: 'Please verify your email first' }, { status: 400 });
    }

    console.log('User found:', user);
    console.log('Password from request:', password);
    console.log('Hashed password from DB:', user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);//compares already db pwd(hashed one) with pwd entred at the time of login(plain text one)  , comparision will be taken cared by .compare fucntion, we don;t need to worry about that!
    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }


    //role of JWT: new token genrated using jwt.sign() function 3 parameters (user id in jason format, jwt secret, expiry in 'd' units in jason format)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return NextResponse.json({ message: 'Login successful', token, _id: user._id }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}