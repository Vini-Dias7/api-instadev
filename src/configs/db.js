/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */

require('dotenv').config();

module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  define:{
    timestamps: true,
    undescored: true,
    undescoredAll: true,
  },
};
