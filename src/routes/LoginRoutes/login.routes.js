import { Router } from "express";

import {
    postUser
  } from "../../controllers/LoginController/login.controller.js";
  
  const router = Router();
  
  // Login User
  router.post("/login", postUser);
  
  export default router;