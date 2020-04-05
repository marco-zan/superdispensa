import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, ManyToOne, Connection } from "typeorm";
import { Barcode } from "./Barcode";

@Entity("prodotto")
export class Prodotto extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("varchar", { length: 30 })
    nome!: string | undefined;

    @ManyToOne(type => Barcode, barcode => barcode.code)
    barcode !: Barcode[];

    scadenza !: string;

    constructor(id?: number, nome?: string){
        super();
        this.id = id;
        this.nome = nome;
    }

    public async getProdotto(conn: Connection, barcode: String): Promise<Prodotto | undefined> {
        return conn.getRepository(Prodotto).findOne({
            where: { barcode: barcode }, 
            relations: ['barcode']
        })
    }
}

export default Prodotto;