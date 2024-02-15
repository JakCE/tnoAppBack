import { pool } from "../../db.js";
import jwt from 'jsonwebtoken';

export const postUser = async (req, res) => {
    try {
      const { USERNAME, PASS } = req.body;
      const [rows] = await pool.query(
        'SELECT USERNAME, ROL FROM userlogin where USERNAME=? AND PASS=?',
        [USERNAME, PASS]
      );
      if (rows.length > 0) {
        const data = JSON.stringify(rows[0]);
        const token = jwt.sign(data, 'tno');
        res.status(201).json({ token });
      } else {
        res.status(500).json('Usuario o clave incorrecta');
      }
      //res.status(201).json({ ID_ESTUDIANTE: rows.insertId, DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };