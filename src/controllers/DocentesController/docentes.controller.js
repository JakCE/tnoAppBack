import { pool } from "../../db.js";

export const getDocentes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Docente");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM Docente WHERE ID_DOCENTE = ?", [
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

export const deleteDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM Docente WHERE ID_DOCENTE = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createDocente = async (req, res) => {
    try {
      const { DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION } = req.body;
      const [rows] = await pool.query(
        'INSERT INTO Docente (DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION, ESTADO, FECHA_REG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO,  CELULAR, DIRECCION, 1, new Date()]
      );
      res.status(201).json({ ID_DOCENTE: rows.insertId, DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

export const updateDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const { DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION } = req.body;

    const [result] = await pool.query(
      `UPDATE Docente
      SET 
      DNI = IFNULL(?, DNI),
      NOMBRES = IFNULL(?, NOMBRES),
      APELLIDOS = IFNULL(?, APELLIDOS),
      EDAD = IFNULL(?, EDAD),
      FECHA_NACIMIENTO = IFNULL(?, FECHA_NACIMIENTO),
      CELULAR = IFNULL(?, CELULAR),
      DIRECCION = IFNULL(?, DIRECCION),
      FECHA_ACT = ?
      WHERE ID_DOCENTE = ?`,
      [DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION, new Date(), id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Estudent not found" });

    const [rows] = await pool.query("SELECT * FROM Docente WHERE ID_DOCENTE = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
