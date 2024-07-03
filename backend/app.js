const experss = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const db = require("./config/database");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const {isAuthenticatedUser, authorizeRoles} = require('./middlewares/authMiddleware')
const cookieParser = require("cookie-parser");
const upload = require('express-fileupload')
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();
const app = experss();
app.use(experss.json());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());

app.use(cors({origin:"*"}));


// Routes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../../frontend/public");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage });
// login user


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Middle wares
app.use(errorMiddleware);

module.exports = app;
