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

const updateHospital = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'Actualizando hospital'
    });

};

const deleteHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrando hospital'
    });

};

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}