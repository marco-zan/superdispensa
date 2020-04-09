import { Router } from "express";
import { lista } from "./lista";
import { inserisciGet, inserisciPost, getByBarcode } from "./inserisci";

export const routes: Router = Router();

routes.get("/lista", lista);
routes.get("/inserisci", inserisciGet);
routes.post("/inserisci", inserisciPost);
routes.post("/prodotto/:barcode", getByBarcode);

routes.get("/", (req, res) => res.redirect("lista"));

