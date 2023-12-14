import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Article = sequelize.define(
  "Article",
  {
    title:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    category:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    body:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    author:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  }
)

export default Article



// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Article extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Article.init({
//     title: DataTypes.STRING,
//     category: DataTypes.STRING,
//     body: DataTypes.STRING,
//     image: DataTypes.STRING,
//     author: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Article',
//     timestamps: true, 
//     createdAt: 'createdAt',
//     updatedAt: 'updatedAt',
//   });
//   return Article;
// };