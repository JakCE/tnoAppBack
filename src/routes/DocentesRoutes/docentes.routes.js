import { Router } from "express";
import {
  createDocente,
  deleteDocente,
  getDocente,
  getDocentes,
  updateDocente,
} from "../../controllers/DocentesController/docentes.controller.js";
import { VerifyToken } from "../../VerifyToken.js";

const router = Router();

// GET all Estudents
router.get("/docentes", VerifyToken, getDocentes);

// GET An Employee
router.get("/docentes/:id", VerifyToken, getDocente);

// DELETE An Employee
router.delete("/docentes/:id", VerifyToken, deleteDocente);

// INSERT An Employee
router.post("/docentes", VerifyToken, createDocente);

router.patch("/docentes/:id", VerifyToken, updateDocente);

export default router;