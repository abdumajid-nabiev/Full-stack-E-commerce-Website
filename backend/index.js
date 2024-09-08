// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");

// const orderRoutes = require('./routes/orderRoutes');
// const userRoutes = require('./routes/userRoutes');

// const port = process.env.PORT || 0;



// app.use(express.json());
// app.use(cors());

// // Use the routes
// app.use('/api', orderRoutes);
// app.use('/api', userRoutes);

// // Connect to MongoDB (replace with your MongoDB URI)
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((error) => console.log('MongoDB connection error:', error));

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



// // Database Connection With MongoDB
// mongoose.connect('mongodb+srv://abdumajid7007:8ThZGTKKPcXgxDH1@abdumajid.htj7v.mongodb.net/e-commerce');

// // paste your mongoDB Connection string above with password
// // password should not contain '@' special character


// //Image Storage Engine 
// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const upload = multer({ storage: storage })
// app.post("/upload", upload.single('product'), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `/images/${req.file.filename}`
//   })
// })


// // Route for Images folder
// app.use('/images', express.static('upload/images'));


// // MiddleWare to fetch user from token
// const fetchuser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, "secret_ecom");
//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
// };


// // Schema for creating user model
// const Users = mongoose.model("Users", {
//   name: { type: String },
//   email: { type: String, unique: true },
//   password: { type: String },
//   cartData: { type: Object },
//   date: { type: Date, default: Date.now() },
// });


// // Schema for creating Product
// const Product = mongoose.model("Product", {
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   category: { type: String, required: true },
//   new_price: { type: Number },
//   old_price: { type: Number },
//   date: { type: Date, default: Date.now },
//   avilable: { type: Boolean, default: true },
// });


// // ROOT API Route For Testing
// app.get("/", (req, res) => {
//   res.send("Root");
// });


// // Create an endpoint at ip/login for login the user and giving auth-token
// app.post('/login', async (req, res) => {
//   console.log("Login");
//   let success = false;
//   let user = await Users.findOne({ email: req.body.email });
//   if (user) {
//     const passCompare = req.body.password === user.password;
//     if (passCompare) {
//       const data = {
//         user: {
//           id: user.id
//         }
//       }
//       success = true;
//       console.log(user.id);
//       const token = jwt.sign(data, 'secret_ecom');
//       res.json({ success, token });
//     }
//     else {
//       return res.status(400).json({ success: success, errors: "please try with correct email/password" })
//     }
//   }
//   else {
//     return res.status(400).json({ success: success, errors: "please try with correct email/password" })
//   }
// })


// //Create an endpoint at ip/auth for regestring the user & sending auth-token
// app.post('/signup', async (req, res) => {
//   console.log("Sign Up");
//   let success = false;
//   let check = await Users.findOne({ email: req.body.email });
//   if (check) {
//     return res.status(400).json({ success: success, errors: "existing user found with this email" });
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }
//   const user = new Users({
//     name: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart,
//   });
//   await user.save();
//   const data = {
//     user: {
//       id: user.id
//     }
//   }

//   const token = jwt.sign(data, 'secret_ecom');
//   success = true;
//   res.json({ success, token })
// })


// // endpoint for getting all products data
// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All Products");
//   res.send(products);
// });


// // endpoint for getting latest products data
// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let arr = products.slice(0).slice(-8);
//   console.log("New Collections");
//   res.send(arr);
// });


// // endpoint for getting womens products data
// app.get("/popularinwomen", async (req, res) => {
//   let products = await Product.find({ category: "women" });
//   let arr = products.splice(0, 4);
//   console.log("Popular In Women");
//   res.send(arr);
// });

// // endpoint for getting womens products data
// app.post("/relatedproducts", async (req, res) => {
//   console.log("Related Products");
//   const {category} = req.body;
//   const products = await Product.find({ category });
//   const arr = products.slice(0, 4);
//   res.send(arr);
// });


// // Create an endpoint for saving the product in cart
// app.post('/addtocart', fetchuser, async (req, res) => {
//   console.log("Add Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Added")
// })


// // Create an endpoint for removing the product in cart
// app.post('/removefromcart', fetchuser, async (req, res) => {
//   console.log("Remove Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] != 0) {
//     userData.cartData[req.body.itemId] -= 1;
//   }
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Removed");
// })


// // Create an endpoint for getting cartdata of user
// app.post('/getcart', fetchuser, async (req, res) => {
//   console.log("Get Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);

// })


// // Create an endpoint for adding products using admin panel
// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   }
//   else { id = 1; }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     description: req.body.description,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });
//   await product.save();
//   console.log("Saved");
//   res.json({ success: true, name: req.body.name })
// });


// // Create an endpoint for removing products using admin panel
// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({ success: true, name: req.body.name })
// });

// // Starting Express Server
// app.listen(port, (error) => {
//   if (!error) console.log("Server Running on port " + port);
//   else console.log("Error : ", error);
// });


require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mkdirp = require('mkdirp'); // Ensure directory exists

const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if PORT not set

// Middleware
app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'upload', 'images');
mkdirp.sync(uploadDir);

// Image Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

// Upload route
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  });
});

// Route for Images folder
app.use('/images', express.static(uploadDir));

// Middleware to fetch user from token
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("Error: MONGO_URI is not defined in environment variables.");
  process.exit(1); // Exit the process with an error
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if connection fails
  });

// Schemas
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});

const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// Routes
app.get("/", (req, res) => {
  res.send("Root");
});

// User Authentication and Cart Routes

app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password; // Replace with real password hashing comparison
    if (passCompare) {
      const data = {
        user: {
          id: user._id  // Ensure this ID is coming from the database
        }
      };
      success = true;
      const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_com');
      res.json({ success, token });
    } else {
      return res.status(400).json({ success, errors: "Please try with correct email/password" });
    }
  } else {
    return res.status(400).json({ success, errors: "Please try with correct email/password" });
  }
});


app.post('/signup', async (req, res) => {
  let success = false;
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "User with this email already exists." });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_com');
    success = true;
    res.json({ success, token });
  } catch (error) {
    console.error("Signup error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error("Error fetching all products: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/newcollections", async (req, res) => {
  try {
    let products = await Product.find({});
    let arr = products.slice(-8);
    res.send(arr);
  } catch (error) {
    console.error("Error fetching new collections: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/popularinwomen", async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let arr = products.slice(0, 4);
    res.send(arr);
  } catch (error) {
    console.error("Error fetching popular items in women category: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/relatedproducts", async (req, res) => {
  try {
    const { category } = req.body;
    const products = await Product.find({ category });
    const arr = products.slice(0, 4);
    res.send(arr);
  } catch (error) {
    console.error("Error fetching related products: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/addtocart', fetchuser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
  } catch (error) {
    console.error("Error adding to cart: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/removefromcart', fetchuser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
  } catch (error) {
    console.error("Error removing from cart: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/getcart', fetchuser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    console.error("Error fetching cart: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const product = new Product({
      id: id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Error adding product: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// Use routes
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

// Server setup
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
