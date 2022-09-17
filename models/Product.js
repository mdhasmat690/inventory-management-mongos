const mongoose = require("mongoose");

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at lest 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      require: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs ",
      },
    },

    quantity: {
      type: Number,
      require: true,
      min: [0, "quantity can be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be integer",
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["in-stack", "out-of-stack", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },

    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },

    /*   supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
      },
      categories: [
        {
          name: {
            type: String,
            require: true,
          },
          _id: mongoose.Schema.Types.ObjectId,
        },
      ], */
  },
  {
    timestamps: true,
  }
);

//mongoose middlewares for saving data : pre/ post
productSchema.pre("save", function (next) {
  //this-->
  console.log("before saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("after saving data");

//   next();
// });

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// schema -> model -> query
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
