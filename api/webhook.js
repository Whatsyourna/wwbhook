// api/webhook.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Lấy phần ID/Token từ URL hoặc Body
    const { id, token } = req.query; 
    const discordUrl = `https://discord.com/api/webhooks/${id}/${token}`;

    try {
        const response = await fetch(discordUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send to Discord' });
    }
}

