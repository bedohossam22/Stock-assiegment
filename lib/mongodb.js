import { MongoClient } from "mongodb";

// IF env not exist then throw error
if (!process.env.MONGODB_URI){
    throw new Error("Invalid/Missing enviroment variable: 'MONGODB_URI'")
}

const uri = process.env.MONGODB_URI
const options = {}

let client 
let clientPromise

if (process.env.NODE_ENV === "development"){
    if (!global._mongoClientPromise){
        client = new MongoClient(uri , options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // production mode 
    client = new MongoClient(uri , options)
    clientPromise = client.connect()
}


export default clientPromise