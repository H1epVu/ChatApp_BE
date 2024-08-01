const sequelize = require('../db');
const Conversation = require('../models/conversation');
const Participant = require('../models/participant');

exports.createConv = async (req, res) => {
    try {
        const { name, participants } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Tên không được để trống!' });
        }

        const conversation = await Conversation.create({
            name: name
        });

        const participantRecords = participants.map(userId => ({
            conversation_id: conversation.id,
            user_id: userId,
            joined_at: new Date()
        }));

        await Participant.bulkCreate(participantRecords);

        res.status(201).json({ message: 'Đã tạo cuộc trò chuyện mới!', conversation });

    } catch (error) {
        console.error('Lỗi khi tạo cuộc trò chuyện:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi!' });
    }
}