import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Connection, Not, MoreThan } from "typeorm";
import Prodotto from "./Prodotto";
import { dateToString, remDays } from "../../utils/date";

@Entity("vero")
export class Vero extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("date")
    scadenza!: string;
    
    @Column("int")
    quantita!: number;

    // @Column("smallint", { default: 0 })// 0: da mangiare, 1: mangiato
    // stato!: number | undefined;

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
                where: {
                    quantita: Not(0),
                    scadenza: MoreThan(dateToString(remDays(new Date(), 31)))
                },
                order: { scadenza: "ASC" }
            })
    }

    public async insertThis(conn: Connection): Promise<any> {
        return await conn.getRepository(Vero)
            .save(this)
    }

    public async updateQuantity(conn: Connection, id: number, quanto: number): Promise<any> {
        let vero: Vero | undefined = await conn.getRepository(Vero).findOne(id);
        if(vero){
            vero.quantita -= quanto;
            await conn.getRepository(Vero)
                //.update({ id: id }, { quantita:  })
                .save(vero);
            return vero.quantita;
        }else
            throw new Error("Impossibile trovare il prodotto vero")
    }
    
    public async updateQuantityToZero(conn: Connection, id: number): Promise<any> {
        return await conn.getRepository(Vero)
            .update({ id: id }, { quantita: 0 })
    }
}

export default Vero;