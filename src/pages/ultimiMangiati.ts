import { Dbservice } from "../db/Dbservice";
import Prodotto from "../db/entity/Prodotto";
import { Request, Response } from "express";

export const listaUMangiati = async (req: Request, res: Response) => {
    let prodotti: Prodotto[] = [];

    try{
        prodotti = await new Prodotto().getAllMangiati((await Dbservice.getInstance()).getConnection() );    
    }catch(e){}
    
    res.render("ultimiMangiati", {
        umangiati: prodotti
    })
}