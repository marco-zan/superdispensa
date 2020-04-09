import { Request, Response } from "express";
import { Prodotto } from "../db/entity/Prodotto";
import { Vero } from "../db/entity/Vero";
import { Dbservice } from "../db/Dbservice";
import { Connection } from "typeorm";
import Barcode from "../db/entity/Barcode";

export const inserisciGet = async (req: Request, res: Response) => {

    res.render("inserisci", {success: false})
}

export const inserisciPost = async (req: Request, res: Response) => {
    let q = req.body;
    let db: Connection = (await Dbservice.getInstance()).getConnection();
    let prodottoId = q.idprodotto;

    console.log(q)

    // {
    //     barcode: '4856',
    //     nomeprodotto: [ 'Testino', 'Mozzarella santa lucia' ],
    //     idprodotto: '1',
    //     scadenza: '2020-04-24',
    //     quantita: '3'
    //   }

    if(!q.idprodotto) {
        let p = new Prodotto();
        p.nome = q.nomeprodotto[0];

        prodottoId = (<Partial<Prodotto>> ((await p.insertThis(db)).identifiers[0])).id;
        
        let b = new Barcode(q.barcode);
        b.prodotto = p;
        b.insertThis(db)
    }

    let v = new Vero();
    v.prodotto = new Prodotto(prodottoId);
    v.quantita = q.quantita;
    v.scadenza = q.scadenza;

    let success = await v.insertThis(db);

    res.render("inserisci", {success: !!success})
}

export const getByBarcode = async (req: Request, res: Response) => {
    let db: Connection = (await Dbservice.getInstance()).getConnection();
    let prodotto: Prodotto | undefined = await new Prodotto().getProdotto(db, req.params.barcode);

    res.json({ found: !!prodotto, prodotto: prodotto });
}