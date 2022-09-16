const express = require("express");
const app = express();
const cors = require("cors");
const { Mongoose } = require("mongoose");

app.use(express.json());
app.use(cors());

//schema design
const productSchema = Mongoose.Schema(
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

    supplier: {
      type: Mongoose.Schema.types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          require: true,
        },
        _id: Mongoose.Schema.types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
