const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = {
    create
  };

    /*-- Helper Functions --*/
function createJWT(user) {
    return jwt.sign(
      // extra data for the payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }


  
// Create jwt using jwt.sign
// send it back to the user using res.json
async function create(req, res) {
    try {
      // Add the user to the database
      const user = await User.create(req.body);
      // token will be a string
      const token = createJWT(user);
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
      return res.json(token);
    } catch (err) {
      // Client will check for non-2xx status code 
      // 400 = Bad Request
      res.status(401).json(err);
    }
  }
