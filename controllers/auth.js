const { response } = require("express");
const bcrypt = require('bcrypt');
const mysql = require('../database/config');
const {generate_jwt} = require('./helpers/jwt');

const create_user = (req, res) => {
    let { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    const sql = 'INSERT INTO people SET ?';
    // const sql = `SELECT * FROM people WHERE email='${email}'`;
    const params = { name, email, password };

    try {
      // validar si ya existe el correo
      // mysql.query(sql, params, (error, results, fields) => {
      //   if (error) {
      //     res.status(401).json({
      //       error 
      //     })
      //   } else {
      //     res.status(201).json({
      //       results
      //     })
      //     console.log(results);
      //   }
      // });

      // insertar el nuevo user
      mysql.query(sql, params, (error, results, fields) => {
        if (error) {
          res.status(401).json({
            error 
          })
        } else {
          res.status(201).json({
            name,email,password
          })
          console.log(results.insertId);
        }
      });
    } catch (error) {
      res.status(500).json({
        error
      })
    }

    

}

const login = async (req, res = response) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM people WHERE email=?`;
  const token = await generate_jwt('id','name')

  try {
    mysql.query(sql, [email], (error, results, fields) => {
      if (error) {
        res.status(401).json({
          error
        });
      } else if (results.length === 0) {
        res.status(401).json({
          error: "User not found"
        });
      } else {
        const { id,name,password: record_password } = results[0];
        const valid_password = bcrypt.compareSync(password, record_password);
        if (valid_password) {
          //generate JWT
          // const token = await generate_jwt(id,name)

          res.status(200).json({
            ...results[0],
            token
          });
        } else {
          res.status(401).json({
            error: "Invalid password"
          });
        }
      }
    });
  } catch (error) {}
};

const revalidar_token = async (req,res)=>{
  const token = await generate_jwt('id','name')
  res.json({
        ok : "renew",
        token
    })
}

module.exports = {
    create_user,
    login,
    revalidar_token
}