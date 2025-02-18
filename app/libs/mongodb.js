import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.NEXT_PUBLIC_DATABASE_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
};

if (!MONGODB_URL) {
    throw new Error('Invalid/Missing MONGODB_URL environment variable');
}

const client = new MongoClient(MONGODB_URL, options);

let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the client is not recreated on every hot reload
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    clientPromise = client.connect();
}

export default clientPromise;