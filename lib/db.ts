import mongoose from "mongoose"

interface Connection {
  isConnected?: number;
}

const connection: Connection = {}

async function connectToDatabase() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGODB_URI as string)

  connection.isConnected = db.connections[0].readyState
}

export { connectToDatabase }

