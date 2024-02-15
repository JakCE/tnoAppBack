import { Router } from "express";
import {
  createApoderado,
  deleteApoderado,
  getApoderado,
  getApoderados,
  updateApoderado,
} from "../../controllers/ApoderadosController/apoderados.controller.js";
import { VerifyToken } from "../../VerifyToken.js";

const router = Router();

// GET all Estudents
router.get("/apoderados", VerifyToken, getApoderados);

// GET An Employee
router.get("/apoderados/:id", VerifyToken, getApoderado);

// DELETE An Employee
router.delete("/apoderados/:id", VerifyToken, deleteApoderado);

// INSERT An Employee
router.post("/apoderados", VerifyToken, createApoderado);

router.patch("/apoderados/:id", VerifyToken, updateApoderado);

export default router;