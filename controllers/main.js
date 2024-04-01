const {Room,User} = require('../models');

exports.RenderMain = (req,res) => {
    res.render('index');
}

exports.RenderLogin = (req,res) => {
    res.render('login');
}

exports.RenderRoom = async (req,res,next) => {
    try {
        const Room = await Room.findAll({
            where : {project_type : req.body.type},
            include: {
                model: User,
                attributes:['id','nick'],
            },
            order:[['createdAt', 'DESC']],
        });

        res.render('index', {
            Rooms: Room,
        });
        
    } catch(error) {
        console.log(error);
    }
    
}

exports.Create_Room = async (req,res,next) => {
    try {
        const New_Room  = await Room.create({
            project_name: req.body.project_name,
                
            leader : req.body.leader,
               
            contents : req.body.Room_info,
               
            project_start : req.body.start_date,
               
            project_end : req.body.end_date,
               
            occupancy : req.body.occupancy,
            
            project_type : req.body.end_date,
                
            kakao_chat : req.body.chat,
                
        });

        res.redirect('/');
  
    } catch(error) {
        console.log(error);
    }
}