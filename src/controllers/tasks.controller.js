import { v4 } from "uuid";
import { getConnection } from "../database.js";

export const getTasks = (req, res) => {

};

export const createTask = async (req, res) => {

};

export const getTask = (req, res) => {

};

export const updateTask = async (req, res) => {

};

export const deleteTask = async (req, res) => {

};

export const count = async (req, res) => {
  console.log("count")
  const db = getConnection();
  await db.query('select * from test_tabla', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};
