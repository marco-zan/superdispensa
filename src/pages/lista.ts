import { Request, Response } from "express";
import { Prodotto } from "../db/entity/Prodotto";
import { Vero } from "../db/entity/Vero";
import { Dbservice } from "../db/Dbservice";
import { stringToDate, dateToString } from "../utils/date";

interface ProdottoVero {
    prodotto: Prodotto,
    vero: Vero
}

// let prova: ProdottoVero = {
//     prodotto: new Prodotto(12, "Pomodoro"),
//     vero: new Vero(14)
// }

export const lista = async (req: Request, res: Response) => {
    let prodotti: Vero[] = [];

    try{
        prodotti = await new Vero().getProdottoVero((await Dbservice.getInstance()).getConnection() );    
    }catch(e){}

    let scaduti: Vero[] = [];
    let inScadenza: Vero[] = [];
    let scadenze: Vero[] = [];

    prodotti.forEach((e) => {
        if(e.prodotto){
            let date: Date = stringToDate(e.scadenza, "-")
            let now: Date = new Date();
            let diff = date.getTime() - now.getTime();
            // console.log(e.prodotto)
            if(diff < 0)
                scaduti.push(e)
            else if (diff < 345600000)
                inScadenza.push(e)
            else 
                scadenze.push(e)
        }
    })
    console.log(scaduti, inScadenza, scadenze);
    
    res.render("lista", {
        scaduti: scaduti,
        inScadenza: inScadenza,
        scadenze: scadenze
    })
}

export const mangiatoTt = async (req: Request, res: Response) => {
    let q = req.body;
    console.log(q.idVeroMangiato, req.params)
    let ultimoMangiato,
    statoVeroCambiato = await new Vero().updateQuantityToZero(
        (await Dbservice.getInstance()).getConnection(),
        parseInt(q.idVeroMangiato)
    ); 

    console.log(statoVeroCambiato);

    //setto il ultimoMangiato
    ultimoMangiato = await new Prodotto().setMangiato(
        (await Dbservice.getInstance()).getConnection(),
        parseInt(req.params.id),
        dateToString(new Date())
    );

    res.json({ result : ( !!statoVeroCambiato && !!ultimoMangiato ) })
}

export const mangiato = async (req: Request, res: Response) => {
    let q = req.body;
    console.log(q.idVeroMangiato, req.params)
    let ultimoMangiato,
    statoVeroCambiato = await new Vero().updateQuantity(
        (await Dbservice.getInstance()).getConnection(),
        parseInt(q.idVeroMangiato),
        1
    ); 

    console.log(statoVeroCambiato);

    if(statoVeroCambiato == 0)
    //setto il ultimoMangiato
        ultimoMangiato = await new Prodotto().setMangiato(
            (await Dbservice.getInstance()).getConnection(),
            parseInt(req.params.id),
            dateToString(new Date())
        );
    else
        ultimoMangiato = true

    res.json({ result : ( !!statoVeroCambiato && !!ultimoMangiato ), nQuantita: statoVeroCambiato })
}