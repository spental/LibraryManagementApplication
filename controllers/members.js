// //get the  model from the models folder
const db = require('../models');
//create the new member
let createNewMember = (req, res) => {
    db.members.findAll({ where: { memID: req.body.memID } })
        .then(function (data) {
            if(!data.length){
            db.members.create({
                memID: req.body.memID,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneno: req.body.phoneno
            })
                .then(function () {
                    res.json("member");
                })
                .catch(function (err) {
                    res.status(401).json(err);
                });
            }
            else
            {
                res.status(401).json(err);
            }
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}
//update the member in the database using member id
let updateMember = (req, res) => {
    db.members.findAll({ where: { memID: req.body.memID } })
        .then(function (data) {
            console.log(data[0].dataValues.memID);
            const memberId=data[0].dataValues.id;
            db.members.update(req.body,
                {
                  where: {
                    id: memberId
                  }
                })
                .then(function(dbMember) {
                  res.json(dbMember);
                });
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}
//delete the member from the database using memberid
let deleteMember=(req, res) => {
    db.members.destroy({ where: { memID: req.body.memID } })
        .then(function (data) {
            res.json("success");           
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}
//export the functions to create delete and update members
module.exports.createNewMember = createNewMember;  
module.exports.deleteMember = deleteMember;   
module.exports.updateMember = updateMember;    