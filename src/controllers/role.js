const { response, request } = require('express');

const roleCtrl = {}

const Role = require('../models/role');


roleCtrl.createrRole = async (req = request, res = response) => {

    const {rol} = req.body;

    const role = new Role({rol});

    await role.save();

    res.json({
        role
    })

}

module.exports = roleCtrl;