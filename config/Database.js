import { Sequelize } from "sequelize";

const db = new Sequelize("book_data", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
