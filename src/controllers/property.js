const { response, request } = require('express')
const Property = require('../models/roperty')

const propertyCtrl = {}

propertyCtrl.getAllproperty = async (req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query = {estado: true}

    const [allProperty, property] = await Promise.all([
        Property.countDocuments(query),
        Property.find(query)
            .populate('user', 'firstName')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        allProperty,
        property
    })


}

propertyCtrl.getproperty = async (req = request, res = response) => {

    const { id } = req.params;
    const product = await Property.findById( id ).populate('user', 'firstName').populate('category', 'name')


    res.json(product);

}

propertyCtrl.createrproperty = async (req = request, res = response) => {
    const { estado, user, ...body } = req.body;

    const PropertyDB = await Property.findOne({name: body.name})

    if( PropertyDB ) {
        return res.status(400).json({
            msg: `La producto ${PropertyDB.name}, ya existe`
        })
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
    }

    const property = new Property(data)

    await property.save();

    res.status(201).json(property)

}

propertyCtrl.updateproperty = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, user, ...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const property = await Property.findByIdAndUpdate(id, data, { new: true })

    res.json(property);

}


propertyCtrl.deletedproperty = async (req = request, res = response) => {

    const { id } = req.params;

    const property = await Property.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(property);

}

module.exports = productsCtrl