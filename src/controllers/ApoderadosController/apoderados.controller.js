import { pool } from "../../db.js";

export const getApoderados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Apoderado");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getApoderado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM Apoderado WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteApoderado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM Apoderado WHERE ID_APODERADO = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createApoderado = async (req, res) => {
    try {
      const { DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION } = req.body;
      const [rows] = await pool.query(
        'INSERT INTO Apoderado (DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION, ESTADO, FECHA_REG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO,  CELULAR, DIRECCION, 1, new Date()]
      );
      res.status(201).json({ ID_APODERADO: rows.insertId, DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

export const updateApoderado = async (req, res) => {
  try {
    const { id } = req.params;
    const { DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION } = req.body;

    const [result] = await pool.query(
      `UPDATE Apoderado
      SET 
      DNI = IFNULL(?, DNI),
      NOMBRES = IFNULL(?, NOMBRES),
      APELLIDOS = IFNULL(?, APELLIDOS),
      EDAD = IFNULL(?, EDAD),
      FECHA_NACIMIENTO = IFNULL(?, FECHA_NACIMIENTO),
      CELULAR = IFNULL(?, CELULAR),
      DIRECCION = IFNULL(?, DIRECCION),
      FECHA_ACT = ?
      WHERE ID_APODERADO = ?`,
      [DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION, new Date(), id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Estudent not found" });

    const [rows] = await pool.query("SELECT * FROM Apoderado WHERE ID_APODERADO = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
