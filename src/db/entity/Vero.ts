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
                order: { scadenza: "ASC" }
            })
    }

    public async insertThis(conn: Connection): Promise<any> {
        return await conn.getRepository(Vero)
            .save(this)
    }
}

export default Vero;