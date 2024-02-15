import { Router } from "express";
import {
  createGrupo,
  deleteGrupo,
  getGrupo,
  getGrupos,
  updateGrupo,
} from "../../controllers/GruposController/grupos.controller.js";
import { VerifyToken } from "../../VerifyToken.js";

const router = Router();

// GET all Estudents
router.get("/grupos", VerifyToken, getGrupos);

// GET An Employee
router.get("/grupos/:id", VerifyToken, getGrupo);

// DELETE An Employee
router.delete("/grupos/:id", VerifyToken, deleteGrupo);

// INSERT An Employee
router.post("/grupos", VerifyToken, createGrupo);

router.patch("/grupos/:id", VerifyToken, updateGrupo);

export default router;