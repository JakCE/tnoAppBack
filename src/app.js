import express from "express";
import morgan from "morgan";

import estudiantesRoutes from "./routes/EstudiantesRoutes/estudiantes.routes.js";
import docentesRoutes from "./routes/DocentesRoutes/docentes.routes.js";
import apoderadosRoutes from "./routes/ApoderadosRoutes/apoderados.routes.js";
import gruposRoutes from "./routes/GruposRoutes/grupos.routes.js";
import matriculaRoutes from "./routes/MatriculaRoutes/matricula.routes.js";
import indexRoutes from "./routes/index.routes.js";
import loginRoutes from "./routes/LoginRoutes/login.routes.js";
import cors from 'cors';

const app = express();

app.use(cors());
// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", [estudiantesRoutes, docentesRoutes, apoderadosRoutes, gruposRoutes, matriculaRoutes, loginRoutes]);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;