const { response } = require('express');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Medic = require('../models/medic');

const searchWhole = async (req, res = response) => {
    
    const term = req.params.term;
    const regex = new RegExp( term, 'i' );

    try {

        const [ users, hospitals, medics ] = await Promise.all([
            User.find({ name: regex }),
            Hospital.find({ name: regex }),
            Medic.find({ name: regex })
        ])

        res.json({
            ok: true,
            msg: 'Realizando la búsqueda.',
            users,
            hospitals,
            medics
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar los logs.'
        });
    }
}

const searchByCollection = async(req, res = response) => {

    const { collection, term} = req.params;
    const regex = new RegExp( term, 'i' );

    try {
        
        let  data;

        switch (collection) {
            case 'users':
                data = await User.find({ name: regex });
                break;

            case 'medics':
                data = await Medic.find({ name: regex })
                                .populate('user', 'name')
                                .populate('hospital', 'name');
                break;
        
            case 'hospitals' :
                data = await Hospital.find({ name: regex })
                                .populate('user', 'name');
                break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La collección debe ser users, medics o hospitals'
                });
                break;
        }

        res.json({
            ok: true,
            collection,
            results: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, ver los logs'
        });
    }
}

module.exports = {
    searchWhole,
    searchByCollection
}