import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('telegram_bot');
            const messages = database.collection('messages');

            await messages.insertOne(req.body);

            res.status(200).json({ success: true });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}