import {MongoClient} from 'mongodb'

const url = process.env.MONGODB_URI || `mongodb://localhost:27017/myOrganizer`
let db = null

export async function connectDB() {

    if (db) return db
    let client = await MongoClient.connect(url , {useNewUrlParser: true})
    db = client.db()
    console.info("Got DB" , db)
    return db
}

// connectDB()