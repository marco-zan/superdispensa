import { Router } from "express";
import { lista, mangiato } from "./lista";
import { inserisciGet, inserisciPost, getByBarcode, getAll } from "./inserisci";
import { listaUMangiati } from "./ultimiMangiati"

export const routes: Router = Router();

routes.get("/lista", lista);
routes.get("/inserisci", inserisciGet);
routes.get("/prodotto/lista", getAll);
routes.get("/listaUltimiMangiati", listaUMangiati);
routes.post("/inserisci", inserisciPost);
routes.post("/prodotto/:id", getByBarcode);
routes.post("/prodotto/:id/mangiato", mangiato);

routes.get("/", (req, res) => res.redirect("lista"));

