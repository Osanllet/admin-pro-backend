const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {

    try {
        const hospitals = await Hospital.find()
                                        .populate('user', 'name');

        res.json({
            ok: true,
            hospitals
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar los logs.'
        })
    }


};

const createHospital = async(req, res = response) => {

    const uid = req.uid; 
    const hospital = new Hospital({
        user: uid,
        ...req.body 
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        }); 
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar los logs.'
        });

    }

};

const updateHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado.'
            });
        }
        
        const fieldsToUpdate = {
            ...req.body,
            user: uid
        };

        const hospitalUpdated = await Hospital.findByIdAndUpdate( id, fieldsToUpdate, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar los logs.'
        });
    }

};

const deleteHospital = async(req, res = response) => {

    const id = req.params.id;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado.'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado.'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro inesperado, revisar los logs.'
        });
    }

};

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}