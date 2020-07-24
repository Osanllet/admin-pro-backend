const { response } = require('express');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');

const getMedics = async (req, res = response) => {

    try {
        
        const medics = await Medic.find()
                                  .populate('user', 'name')
                                  .populate('hospital', 'name');

        res.json({
            ok: true,
            medics
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar los logs.'
        })
    }
};

const createMedic = async(req, res = response) => {

    const uid = req.uid;
    const hospitalId = req.body.hospital;
    const medic = new Medic({
        user: uid,
        ...req.body
    });

    try {

        const existHospital = await Hospital.findById( hospitalId );

        if ( !existHospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado.'
            });
        }

        const medicDB = await medic.save();

        res.json({
            ok: true,
            medic: medicDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, ver los logs.'
        })
    }

};

const updateMedic = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Actualizando Médico'
    });
};

const deleteMedic = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Eliminando Médico'
    });
};

module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
};