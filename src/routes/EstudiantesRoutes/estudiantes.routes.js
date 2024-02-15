import { Router } from "express";
import {
  createEstudiante,
  deleteEstudiante,
  getEstudiante,
  getEstudiantes,
  updateEstudiante,
} from "../../controllers/EstudiantesController/estudiantes.controller.js";
import { VerifyToken } from "../../VerifyToken.js";

const router = Router();

// GET all Estudents
router.get("/estudiantes", VerifyToken, getEstudiantes);

// GET An Employee
router.get("/estudiantes/:id", VerifyToken, getEstudiante);

// DELETE An Employee
router.delete("/estudiantes/:id", VerifyToken, deleteEstudiante);

// INSERT An Employee
router.post("/estudiantes", VerifyToken, createEstudiante);

router.patch("/estudiantes/:id", VerifyToken, updateEstudiante);

export default router;