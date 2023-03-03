const { response } = require("express");
const mysql = require('../database/config');

const create_user = (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO people SET ?';
    const params = { name, email, password };
  
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
  }

const login = (req,res = response)=>{
    const {email,pass} = req.body;

    res.json({
        email,pass
    })
}

const revalidar_token = (req,res)=>{
    res.json({
        ok : "renew"
    })
}

module.exports = {
    create_user,
    login,
    revalidar_token
}