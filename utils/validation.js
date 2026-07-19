const validator = require('validator');

const validateSignUpdata = (req) => 
{
    const { name, email, password, preferences} = req.body;

    if( !name )
    {
        throw new Error("Name is not valid");
    }
    else if( !validator.isEmail( email) )
    {
         throw new Error("email not valid");
    }
    else if( !validator.isStrongPassword( password ) )
    {
         throw new Error("Enter a Strong Password bro plz🤦‍♂️🤦‍♂️");
    }
}

module.exports = validateSignUpdata ;