import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, ManyToOne, Connection, OneToMany, Not, IsNull } from "typeorm";
import { isDate } from "util";
import Vero from "./Vero";

export interface SumProd {
    idProdotto: number,
    nomeProdotto: string,
    ultimo_mangiato: string,
    um: Date | null,
    quantita: number | null
}

@Entity("prodotto")
export class Prodotto extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("varchar", { length: 30 })
    nome!: string | undefined;

    @Column("date", { nullable: true, default: null })
    ultimo_mangiato!: string | undefined;

    // scadenza !: string;

    constructor(id?: number, nome?: string, ultimo_mangiato?: string){
        super();
        this.id = id;
        this.nome = nome;
        this.ultimo_mangiato = ultimo_mangiato;
    }

    public async getProdotto(conn: Connection, id: number): Promise<Prodotto | undefined> {
        return await conn.getRepository(Prodotto)
            .findOne({
                where: { id: id }, 
                relations: ['barcode']
            })
    }

    public async insertThis(conn: Connection) {
        return await conn.getRepository(Prodotto).insert(this);
    }

    public async lista(conn: Connection): Promise<Prodotto[]> {
        return await conn.getRepository(Prodotto).find({});
    }

    public async getAll(conn: Connection): Promise<SumProd[]> {
        return (<SumProd[]> await conn.getRepository(Prodotto)
            .createQueryBuilder("p")
            .select("p.id", 'id')
            .addSelect("p.nome", "nome")
            .addSelect("p.ultimo_mangiato", "um")
            .addSelect("sum(v.quantita)", 'quantita')
            //.from(Prodotto, "p")
            .leftJoin(Vero, 'v', 'v.prodottoId = p.id')
            // .addFrom(Vero, "v")
            .groupBy("p.id")
            .orderBy("p.nome")
            // .getSql()
            .getRawMany())
    }

    public async getAllMangiati(conn: Connection): Promise<Prodotto[]> {
        return await conn.getRepository(Prodotto).find({
            where: {
                ultimo_mangiato: Not(IsNull())
            },
            order: {
                ultimo_mangiato: "ASC"
            }
        });
    }

    public async setMangiato(conn: Connection, id: number, um: string) {
        return await conn.getRepository(Prodotto).update({ id: id }, { ultimo_mangiato: um})
    }
}

export default Prodotto;