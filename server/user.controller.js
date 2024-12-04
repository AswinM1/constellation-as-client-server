const usermodel = require("../server/model/user");

const getUser = async (req, res) => {
  try {
    const response = await usermodel.find({});
    res.send(response);
    res.send("hello")
  } catch (error) {
    res.json({ error: error.message });
  }
};

const postUser = async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const response = await usermodel.create({ name, email, pass });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update user by ID
const putUser = async (req, res) => {
  try {
    const id = req.params.id; // Extracting ID from request params
    const updatedData = req.body; // Data to update
    const response = await usermodel.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
    });
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(response);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id; // Extracting ID from request params
    const response = await usermodel.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully", user: response });
  } catch (error) {
    res.json({ error: error.message });
  }
};


const signIn = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await usermodel.findOne({ email});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

 
    if (user.pass!==pass) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Sign In Successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { getUser, postUser, putUser, deleteUser,signIn };
