import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Connection } from "typeorm";
import Prodotto from "./Prodotto";

@Entity("vero")
export class Vero extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("date")
    scadenza!: string;
    
    @Column("int")
    quantita!: number;

    @Column("smallint", { default: 0 })// 0: da mangiare, 1: mangiato
    stato!: number | undefined;

    @ManyToOne(type => Prodotto, prodotto => prodotto.id)
    prodotto !: Prodotto;

    constructor(id?: number){
        super();
        this.id = id;
    }

    public async getProdottoVero(conn: Connection): Promise<any> {
        return await conn.getRepository(Vero)
            .find({
                relations: ['prodotto'],
                where: { stato: 0 },
                order: { scadenza: "ASC" }
            })
    }

    public async insertThis(conn: Connection): Promise<any> {
        return await conn.getRepository(Vero)
            .save(this)
    }

    public async updateStato(conn: Connection, id: number, stato: number): Promise<any> {
        return await conn.getRepository(Vero)
            .update({ id: id }, { stato: stato })
    }
}

export default Vero;