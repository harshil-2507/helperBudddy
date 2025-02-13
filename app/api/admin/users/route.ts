import { NextResponse } from 'next/server'
import { connect } from '@/lib/mongodb'
import Worker from '@/app/models/Worker'

export async function GET(){
    try{
        await connect()
        const users = await Worker.find({})
        return NextResponse.json(users)
    } catch(error){
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
          )
    }
}

export async function POST(request: Request) {
    try {
      console.log('API Called') // Debug log
      await connect()
      
      const body = await request.json()
      console.log('Received Data:', body) // Log incoming request
      
      const { fullName, email, password, mobileNumber } = body
  
      if (!fullName || !email || !password || !mobileNumber) {
        return NextResponse.json(
          { success: false, message: 'Name, Email, and Password are required' },
          { status: 400 }
        )
      }
  
      const newUser = new Worker({ fullName, email, password, mobileNumber })
      await newUser.save()
  
      return NextResponse.json({ success: true, message: 'Worker created successfully' })
    } catch (error: any) {
      console.error('API Error:', error) // Log the error
      console.log('Error Message:', error.message)
  
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }
  
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }
  }
  