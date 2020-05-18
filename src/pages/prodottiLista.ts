import Prodotto, { SumProd } from "../db/entity/Prodotto"
import { Dbservice } from "../db/Dbservice"
import { Request, Response } from "express";
import { dateToString } from "../utils/date";

export const listaProdotti = async (req: Request, res: Response) => {
    let prods: SumProd[] = await new Prodotto().getAll((await Dbservice.getInstance()).getConnection())
    prods.map(e => {
        let x: any = e;
        if(!e.um)
            x.ultimo_mangiato = "Mai"
        else
            x.ultimo_mangiato = dateToString(e.um);

        if(!e.quantita)
            x.quantita = 0;
        // console.log(dateToString(e.um), e.um)
        return x;
    })
    res.render("prodottiLista", {
        prods: prods
    });
}