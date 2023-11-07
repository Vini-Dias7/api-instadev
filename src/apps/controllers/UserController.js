const Users = require("../models/Users");
const bcrypt = require('bcryptjs');

class UserController{
    async create(req, res){
    const verifyUser = await Users.findOne({
        where: {
            email: req.body.email,
        },
    });

    if(verifyUser){
        return res.status(400).json({message: 'User already exists!'});
    }
    const user = await Users.create(req.body);
    if(!user){
        return res.status(400).json({message: 'Failed to create a user!'});
    }
        return res.send({message: 'User created!'});
    }
    async update(req, res){
        const {
            name, 
            avatar, 
            bio,
            gender,
            old_password,
            new_password,
            confirm_new_password,
        } = req.body;

        const user = await Users.findOne({
            where: {
                id : req.userId,
            },
        });
        if(!user){
            return res.status(400).json({
                message: 'user not exists!'
            });
        }
        let encryptedPassword ='';

        if(old_password){
            if(!await user.checkPassword(old_password)){
                return res.status(401).json({error: 'Old password does not match!'});
            }
        if(!new_password || !confirm_new_password){
            return res.status(401).json({
                error: 'We need a new password and confirm new password attributes!'});
            }
        if(new_password != confirm_new_password){
            return res.status(401).json({
                error: 'New password and confirm new password does not match!'
            });
        }
        encryptedPassword = await bcrypt.hash(new_password, 8);
    }
        await Users.update({
            name: name || user.name,
            avatar: avatar || user.avatar,
            bio: bio || user.bio,
            gender: gender || user.gender,
            password_hash: encryptedPassword || user.password_hash,
        },
        {
            where:{
                id: user.id,
            },
        },
        );
        return res.status(200).json({ message: 'User updated!' });
    }

    async delete(req, res){
        const userToDelete = await Users.findOne({
            where:{
                id: req.userId,
            },
        });
        if(!userToDelete){
            return res.status(400).json({ message: 'User not exists!' })
        }
        await Users.destroy({
            where: {
                id: req.userId,
            },
        });
        return res.status(200).json({ message: 'User deleted!' })
    }

    async userProfile(req, res){
        const user = await Users.findOne({
            attributes: ['id', 'name', 'user_name', 'email', 'avatar', 'bio', 'gender'],
            where:{
                id: req.userId,
            },
        });
        if(!user){
            return res.status(400).json({ message: 'User not exists!' });
        }
        return res.status(200).json({ user });
    }
}

module.exports = new UserController();