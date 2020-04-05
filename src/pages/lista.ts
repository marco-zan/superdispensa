import { Request, Response } from "express";
import { Prodotto } from "../db/entity/Prodotto";
import { Vero } from "../db/entity/Vero";
import { Dbservice } from "../db/Dbservice";

interface ProdottoVero {
    prodotto: Prodotto,
    vero: Vero
}

let prova: ProdottoVero = {
    prodotto: new Prodotto(12, "Pomodoro"),
    vero: new Vero(14)
}

export const lista = async (req: Request, res: Response) => {
    let prodotti: ProdottoVero[];

    prodotti = await new Vero().getProdottoVero((await Dbservice.getInstance()).getConnection() );

    console.log(prodotti)

    res.render("lista", {
        scadenze: prodotti
    })
}