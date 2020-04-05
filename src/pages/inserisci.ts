import { Request, Response } from "express";
import { Prodotto } from "../db/entity/Prodotto";
import { Vero } from "../db/entity/Vero";
import { Dbservice } from "../db/Dbservice";
import { Connection } from "typeorm";

export const inserisciGet = async (req: Request, res: Response) => {

    res.render("inserisci")
}

export const inserisciPost = async (req: Request, res: Response) => {

}

export const getByBarcode = async (req: Request, res: Response) => {
    let db: Connection = (await Dbservice.getInstance()).getConnection();
    let prodotto: Prodotto | undefined = await new Prodotto().getProdotto(db, req.query.barcode);

    res.json(JSON.stringify(prodotto));
}