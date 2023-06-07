const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const homeRoutes = require("./routes/homeRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const logoutRoute = require("./routes/logoutRoute");

const authorization = require("./middlewares/authorization");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/home", homeRoutes);
app.use("/delete", deleteRoutes);
app.use("/logout", logoutRoute);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
