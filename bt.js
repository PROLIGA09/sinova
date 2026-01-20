// api/save-bot-reply.js
const fs = require('fs');
const path = require('path');

module.exports = async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        try {
            const messagesPath = path.join(process.cwd(), 'conversation.json');

            let messages = [];
            if (fs.existsSync(messagesPath)) {
                messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
            }

            const newMessage = {
                id: Date.now().toString(),
                ...req.body,
                timestamp: new Date().toISOString()
            };

            messages.push(newMessage);

            // Faqat oxirgi 50 ta xabar
            if (messages.length > 50) {
                messages = messages.slice(-50);
            }

            fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

            console.log('✅ Bot javobi saqlandi:', newMessage.content ? .text ? .substring(0, 50));

            return res.json({ success: true, message: 'Bot javobi saqlandi' });

        } catch (error) {
            console.error('❌ Xatolik:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
};