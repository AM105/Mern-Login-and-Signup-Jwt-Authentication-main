const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})
    

const jwtSecretKey="1234"

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the given email exists
    const user = await collection.findOne({ email: email });

    if (!user) {
      // User with the given email does not exist
      res.json({ status: "notexist", message: "Email not found" });
    } else {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Password is correct, generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecretKey, {
          expiresIn: "1m", // You can set the expiration time as per your requirement
        });

        // Include the token in the response
        res.json({
          status: "success",   
          message: `Welcome, ${user.name}!`,  
          token: token,
        });
      } else {
        // Password is incorrect    
        res.json({ status: "incorrectpassword", message: "Incorrect password" });
      }
    }
  } catch (e) {
    console.error(e);
    res.json({ status: "fail", message: "Login failed" });
  }
});


app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user with the given email already exists
      const check = await collection.findOne({ email: email });
  
      if (check) {
        res.json("exist");
      } else {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user object with the hashed password
        const newUser = {
          name: name,
          email: email,
          password: hashedPassword,
        };
  
        // Save the new user to the database
        await collection.insertMany(newUser);
  
        res.json("notexist");
      }
    } catch (e) {
      console.error(e);
      res.json("fail");
    }
  });








app.listen(8000,()=>{
    console.log("port connected");
})

