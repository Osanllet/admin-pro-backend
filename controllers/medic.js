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

const updateMedic = async(req, res = response) => {
    const id = req.params.id;
    const hospitalId = req.body.hospital;
    const uid = req.uid;

    try {

        const medic = await Medic.findById( id );

        if ( !medic ) {
            return res.status(400).json({
                ok: false,
                msg: "Médico no encontrado."
            });
        }

        const existHospital = await Hospital.findById(hospitalId);

        if (!existHospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado.'
            });
        }

        const { _id, user, img, ...object } = req.body;

        const fieldsToUpdate = {
            ...object,
            user: uid
        };

        const medicUpdated = await Medic.findByIdAndUpdate( id, fieldsToUpdate, { new: true } );

        res.json({
            ok: true,
            medic: medicUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar los logs."
        });
    }

};

const deleteMedic = async (req, res = response) => {
    const id = req.params.id;

    try {
        
        const medic = await Medic.findById( id );

        if ( !medic ) {
            return res.status(400).json({
                ok: false,
                msg: 'Médico no encontrado.'
            });
        }

        await Medic.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico eliminado.'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar los logs.'
        });
    }

};

module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
};