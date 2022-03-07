const bcrypt = require('bcrypt');

const userCtrl = {};

const User = require('../models/User');


userCtrl.checkLogin = async (req,res) => {
    try {
        const {password} = req.body;
        const user = await User.findOne({username: new RegExp('^'+req.params.username+'$')});
        if(user == null)
            res.json({message: 'Wrong username'});
        else
        bcrypt.compare(password, user.password, function(err, result) {
          
            if(result === true)
                res.json({message: 'Logged'});
            else
                res.json({message: 'Wrong password'});
        });
        
    } catch (error) {
        console.log(error);
    }
    
};

userCtrl.createUser = async (req,res) => {
    
    const {username,password} = req.body;
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash) {
            const newUser = new User({
                username: username,
                password: hash
            });
            try {
                await newUser.save();
                res.json({message: 'User created'});
            } catch (error) {
                if(error.code == 11000)
                    res.json({message: 'Username already exists'});
            }
        });
    });
    
};

userCtrl.deleteUser = async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User deleted'});
};

module.exports = userCtrl;