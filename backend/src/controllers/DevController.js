const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(request, response){
        const { user } = request.headers;

        const loggedDeev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                {
                    _id: { $ne: user } //Aqui eu to falando para trazer todos usuários, que não seja igual ao id que to passando
                },
                {
                    _id: { $nin: loggedDeev.likes }
                },
                {
                    _id: { $nin: loggedDeev.dislikes }
                }
            ],
        })

        return response.json(users);
    },

    async store(request, response){
        const { username } = request.body;

        const userExist = await Dev.findOne({ user: username });

        if(userExist){
            return response.json(userExist);
        }

        const githubResponse = await axios.get(`https://api.github.com/users/${username}`); //Pegando as informações do github

        const { name, bio, avatar_url } = githubResponse.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar: avatar_url
        })

        return response.json(dev);
    }
};