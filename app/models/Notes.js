/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * @description Schema created via mongoose
 */
const newSchema = new schema({
  title : {
    type : String
  },
  description : {
    type : String
  },
  collaborator : {
    type : { type: Schema.Types.ObjectId, ref: 'user' }
  },
  reminder : {
    type : Date
  },
  color : {
    type : String
  },
  image : {
    type : String
  },
  pin : {
    type : Boolean
  },
  archive : {
    type : Boolean
  },
  trash : {
    type : Boolean
  }
})

/**
 * @description Model creation on schema
 */
const note = mongoose.model("note", newSchema);
const bcryptjs = require('bcryptjs');

function noteFunction() {

}

/**
 * @description Note Save Mode
 */
noteFunction.prototype.noteSave = (req, callback) => {
  let newNote = new note({
    title : req.title,
    description : req.description,
    collaborator : req.collaborator,
    reminder : req.reminder,
    color : req.color,
    image : req.imageUrl,
    pin : req.pin,
    archive : req.archive,
    trash : req.trash
  })

  newNote.save(function (err, result) {
    if (err) {
      return callback(err);
    }
    else {
      return callback(null, result);
    }
  })
}

/**
 * @description 
 */
userFunction.prototype.forgotPasswordModel = (req, callback) => {

  user.findOneAndUpdate({ email_id: req.email }, { token: req.token }, function (err, result) {
    user.findOne({ _id: result._id }, function (err, data) {
      if (err) {
        console.log(err);
        return callback(err);
      }
      else {
        console.log('Successful Token match');
        console.log('Successful data retrieved is : ', data);
        return callback(null, data);
      }
    })
  })
}


/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.loginModel = function (req, callback) {

  user.findOne({ email_id: req.email }, function (err, result) {
    if (result == null) {
      console.log('error in checking ', err);
      return callback(err);
    }
    else {
      bcryptjs.compare(req.password, result.password, function (err, resultFinal) {
        if (resultFinal == null) {
          return callback(null);
        }
        else {
          console.log('resultFinal : ', resultFinal);
          return callback(null, result);
        }
      });
    }

  })
}

/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.logoutModel = function (req, callback) {

  user.findOne({ email_id: req.loggedUser }, function (err, result) {
    if (err) {

      console.log(err);
      return callback(err);
    }
    else {
      console.log('Logout Successful');
      return callback(null, result);
    }
  })
}


/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.findAndSaveTokenModel = function (req, callback) {
  // console.log('req on model find&saveTokenmodel', req);


  bcryptjs.genSalt(10, function (err, salt) {
    if (err) {
      return callback(err)
    }
    else {

      bcryptjs.hash(req.password, salt, function (err, hash) {
        if (err) {
          return callback(err);
        }
        else {

          user.findOneAndUpdate({ token: req.token }, { password: hash }, function (err, result) {
            if (err) {
              console.log(err);
              return callback(err);
            }
            else {
              user.findOne({ _id: result._id }, function (err, data) {
                if (err) {
                  console.log(err);
                  return callback(err);
                }
                else {
                  console.log('Successful Token match');
                  // console.log('Successful data retrieved is : ', data);
                  return callback(null, data);
                }
              })
            }
          })
        }
      })
    }
  })
}

/**
 * @exports function to get database connected and get operation done on basis of request from client
 */
module.exports = new userFunction;