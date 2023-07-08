const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;




const FrontUsername = new mongoose.Schema(
    
    {
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true 
      },name: {
        type: String,
        required: true,
        trim: true,    
      },
      picture: {
        type: String,
        required: true,
        trim: true,
      }
    },
    { timestamps: true, versionKey: false, selectPopulatedPaths: false, toJSON: { virtuals: true } },

  );



  FrontUsername.pre("save", async function (next) {
    
    var user = this;
   

    //var hash = await bcrypt.hash(user.email, saltRounds);
    //this.email = hash;
    next();
  });


  FrontUsername.statics.findcredit = async ({email}, User) => {
    const user = await User.findOne({ email });
   
   
    return user;
  };





  FrontUsername.methods.toJSON = function () {
    var user = this
    var userobject = user.toObject()
    delete userobject._id


    return userobject
}


FrontUsername.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // Of post collection
    foreignField: 'orderidofproduct',    // Of user collection
    
  })


const FrontuserModel = mongoose.model("FrontUsername", FrontUsername);

module.exports = FrontuserModel