const fs = require('fs');

const User = require('../models/user');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');

const deleteImg = ( path ) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const updateImg = async(type, id, fileName, filePath) => {
    let oldPath = '';

    switch (type) {
        case 'users':
            const user = await User.findById( id );
            if ( !user ) {
                console.log('No existe el usuario con ID:', id);
                deleteImg( filePath );
                return false;
            }

            oldPath = `./uploads/users/${ user.img }`;
            deleteImg(oldPath);
            user.img = fileName;

            await user.save();
            return true;
            
            break;
        
        case 'medics':
            const medic = await Medic.findById( id );
            if ( !medic ) {
                console.log('No existe el médico con ID:', id);
                deleteImg(filePath);
                return false
            };

            oldPath = `./uploads/medics/${ medic.img }`;
            deleteImg( oldPath );
            medic.img = fileName;

            await medic.save();
            return true;

            break;

        case 'hospitals':
            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                console.log('No existe el hospital con ID:', id);
                deleteImg(filePath);
                return false;
            }

            oldPath = `./uploads/hospitals/${ hospital.img }`;
            deleteImg( oldPath );
            hospital.img = fileName;

            await hospital.save();
            
            return true;

            break;
    
        default:
            break;
    }

}

module.exports = {
    updateImg
}