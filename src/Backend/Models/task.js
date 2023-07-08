const mongoose = require("mongoose");




const Task = new mongoose.Schema(
    
    {
      task: {
        type: String,
        required: true,
        trim: true,
      },
      
    orderidofproduct:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FrontUsername"
    }
    },
    { timestamps: true},

  );




  const PurchaseModel = mongoose.model("Task", Task);


  module.exports = PurchaseModel