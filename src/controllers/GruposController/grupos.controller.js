import { pool } from "../../db.js";

export const getGrupos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Grupo");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM Grupo WHERE id = ?", [
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

export const deleteGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM Grupo WHERE ID_GRUPO = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createGrupo = async (req, res) => {
    try {
      const { DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION } = req.body;
      const [rows] = await pool.query(
        'INSERT INTO Grupo (DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION, ESTADO, FECHA_REG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO,  CELULAR, DIRECCION, 1, new Date()]
      );
      res.status(201).json({ ID_GRUPO: rows.insertId, DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

export const updateGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION } = req.body;

    const [result] = await pool.query(
      `UPDATE Grupo
      SET 
      DNI = IFNULL(?, DNI),
      NOMBRES = IFNULL(?, NOMBRES),
      APELLIDOS = IFNULL(?, APELLIDOS),
      EDAD = IFNULL(?, EDAD),
      FECHA_NACIMIENTO = IFNULL(?, FECHA_NACIMIENTO),
      CELULAR = IFNULL(?, CELULAR),
      DIRECCION = IFNULL(?, DIRECCION),
      FECHA_ACT = ?
      WHERE ID_GRUPO = ?`,
      [DNI, NOMBRES, APELLIDOS, EDAD, FECHA_NACIMIENTO, CELULAR, DIRECCION, new Date(), id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Estudent not found" });

    const [rows] = await pool.query("SELECT * FROM Grupo WHERE ID_GRUPO = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
