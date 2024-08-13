const Friend = require('../models/friend')
const User = require('../models/user')
const { Op } = require('sequelize');

exports.sendReq = async (req, res) => {
    try {
        const { userId, friend_id } = req.body;
        if (userId == friend_id) {
            return res.status(400).json({ error: 'Không thể tự thêm bản thân.' });
        }
        await Friend.destroy({
            where: {
                user_id: userId,
                friend_id,
                status: 'waiting'
            }
        });
        const friend = await Friend.create({
            user_id: userId,
            friend_id,
            status: 'waiting'
        });
        res.status(201).json({ message: 'Gửi lời mời kết bạn thành công!', friend });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.acceptReq = async (req, res) => {
    try {
        const { userId, friendshipId } = req.body;
        const friend = await Friend.findByPk(friendshipId);
        if (!friend) {
            return res.status(404).json({ error: 'Không tồn tại yêu cầu kết bạn!' });
        }
        if (friend.friend_id != userId) {
            return res.status(403).json({ error: 'Không có quyền chấp nhận yêu cầu!' });
        }
        friend.status = 'accept';
        await friend.save();
        res.status(201).json({ message: 'Chấp nhận yêu cầu thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.rejectReq = async (req, res) => {
    try {
        const { userId, friendshipId } = req.body;
        const friend = await Friend.findByPk(friendshipId);
        if (friend.friend_id != userId) {
            return res.status(403).json({ error: 'Không có quyền từ chối yêu cầu!' });
        }
        await friend.destroy();
        res.status(201).json({ message: 'Từ chối yêu cầu thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.receiveReq = async (req, res) => {
    try {
        const { userId } = req.params
        const invitedReq = await Friend.findAll({
            where: {
                friend_id: userId,
                status: 'waiting'
            },
            include: [
                {
                    model: User,
                    as: 'requester',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });
        res.status(200).json(invitedReq)
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getListFriends = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    { user_id: userId, status: 'accept' },
                    { friend_id: userId, status: 'accept' }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'requester',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        const friendList = friends.map(friend => {
            if (friend.user_id == userId) {
                return {
                    id: friend.receiver.id,
                    name: friend.receiver.name,
                    email: friend.receiver.email
                };
            } else {
                return {
                    id: friend.requester.id,
                    name: friend.requester.name,
                    email: friend.requester.email
                };
            }
        });

        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
};
