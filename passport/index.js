const passport = require('passport');
const User = require('../models/User');
const Room = require('../models/Room');

module.exports = () => {
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser((id,done)=> {
        User.findOne({where:{id},
            include : [{
                model : Room,
                attributes : ['id','project_name'],
                as : 'Rooms',
            },
        ],
        })
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });

    
}