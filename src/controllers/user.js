const {response,request} = require('express')
const userCtrl = {}
const bcryptjs = require('bcryptjs')

const User = require('../models/user');
const Role = require('../models/role');


userCtrl.getUsers = async (req = request, res = response)  => {

    const { limit = 5, from = 0} = req.query;
    const query = {estado: true}

    const [allUser, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from)).limit(Number(limit))
    ])

    res.json({
        allUser,
        user
    })
}

userCtrl.postUser = async (req = request, res = response)  => {

    const { firstName, email, password, rol } = req.body;
    const user = new User({ firstName, email, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar en Bd
    await user.save();

    /*const token = await jwt.sign({id: user.id}, 'secret', {
        expiresIn: 86400
    })*/

    res.json({
        user,
     //   token
    })
}
userCtrl.getUser = async (req, res)  => {}

userCtrl.putUser = async (req = request, res = response)  => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;


    //TODO validar contra base de datos
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user)

}
userCtrl.deleteUser = async (req = request, res = response)  => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { estado: false })

    res.json({user})
}

module.exports = userCtrl;