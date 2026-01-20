// api/get-conversation.js
const fs = require('fs');
const path = require('path');

module.exports = async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET') {
        try {
            const messagesPath = path.join(process.cwd(), 'conversation.json');

            let messages = [];
            if (fs.existsSync(messagesPath)) {
                messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
            }

            console.log(`📊 ${messages.length} ta xabar yuborilmoqda`);

            return res.json({
                success: true,
                conversation: messages,
                count: messages.length,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Xatolik:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
};