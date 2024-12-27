const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const JWT_SECRET = "your_secret_key";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "touseefiqbal845@gmail.com",
    pass: "bpuq zqaw zpuc zzdf",
  },
});

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "Email already in use" });
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const user = new User({ email, password, provider: "email", code });
      await user.save();

      transporter.verify((error, success) => {
        if (error) {
          console.error("Transporter Error:", error);
        } else {
          console.log("Server is ready to send emails");
        }
      });

      await transporter.sendMail({
        from: "touseefiqbal845@gmail.com",
        to: email,
        subject: "Verify Your Account",
        text: `Your verification code is ${code}`,
      });

      res.status(201).send({ message: "Verification code sent to email" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).send({ error: "Something went wrong" });
    }
  },

  verify: async (req, res) => {
    const { email, code } = req.body;

    const user = await User.findOne({ email, code });
    if (!user) return res.status(400).send({ error: "Invalid code" });

    user.verified = true;
    user.code = undefined;
    await user.save();

    res.send({ message: "Account verified" });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, provider: "email" });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.send({ token });
  },

  googleCallback: (req, res) => {
    res.send({ token: req.user.token });
  },

  facebookCallback: (req, res) => {
    res.send({ token: req.user.token });
  },

  linkedinCallback: (req, res) => {
    res.send({ token: req.user.token });
  },
};
