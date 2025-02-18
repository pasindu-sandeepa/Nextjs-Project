import { MongoClient, ServerApiVersion } from 'mongodb';

const clientPromise = () => {
    const MONGODB_URL = process.env.NEXT_PUBLIC_DATABASE_URI;
    const options = {
    };

    if (!MONGODB_URL) {
        throw new Error(
            'Invalid/Missing MONGODB_URL environment variable:"MONOGO_URL"'
        );
    }

    const client = new MongoClient(MONGODB_URL, options);
    return client.connect();
}
export default clientPromise;