import { Router } from "express";
import {
  createMatricula,
  deleteMatricula,
  getMatricula,
  getMatriculas,
  updateMatricula,
} from "../../controllers/MatriculaController/matricula.controller.js";
import { VerifyToken } from "../../VerifyToken.js";

const router = Router();

router.get("/matriculas", VerifyToken, getMatriculas);

router.get("/matriculas/:id", VerifyToken, getMatricula);

router.delete("/matriculas/:id", VerifyToken, deleteMatricula);

router.post("/matriculas", VerifyToken, createMatricula);

router.patch("/matriculas/:id", VerifyToken, updateMatricula);

export default router;