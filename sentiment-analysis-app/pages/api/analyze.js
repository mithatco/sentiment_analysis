import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('http://127.0.0.1:5000/analyze', req.body);
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error calling the external sentiment analysis API:', error);
            res.status(500).json({ message: 'Error calling the external API' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
