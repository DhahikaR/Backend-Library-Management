import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import sequelizeStore from "connect-session-sequelize";
import session from "express-session";
import usersRoute from "./routes/usersRoute.js";
import bookRoute from "./routes/bookRoute.js";
import authRoute from "./routes/authRoute.js";
import db from "./config/Database.js";

dotenv.config();
const app = express();

// const sessionStrore = sequelizeStore(session.Store);
// const store = new sessionStrore({
//   db: db,
// });

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    // store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(express.json());
// app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(usersRoute);
app.use(bookRoute);
app.use(authRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("server running...");
});
