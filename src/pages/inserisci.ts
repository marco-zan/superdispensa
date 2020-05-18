import { Request, Response } from "express";
import { Prodotto, SumProd } from "../db/entity/Prodotto";
import { Vero } from "../db/entity/Vero";
import { Dbservice } from "../db/Dbservice";
import { Connection } from "typeorm";
import { dateToString } from "../utils/date";

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
    console.log(q.idprodotto)
    if(!q.idprodotto) {
        let p = new Prodotto();
        p.nome = q.nomeprodotto[0];

        prodottoId = (<Partial<Prodotto>> ((await p.insertThis(db)).identifiers[0])).id;
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
    let prodotto: Prodotto | undefined = await new Prodotto().getProdotto(db, parseInt(req.params.id));

    res.json({ found: !!prodotto, prodotto: prodotto });
}

export const getAll = async (req: Request, res: Response) => {
    let db: Connection = (await Dbservice.getInstance()).getConnection();
    let prodotti: SumProd[] | undefined = await new Prodotto().getAll(db);

    prodotti.map(e => {
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

    res.json(prodotti);
}
