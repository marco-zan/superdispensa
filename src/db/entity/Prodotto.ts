import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, ManyToOne, Connection, OneToMany } from "typeorm";
import { Barcode } from "./Barcode";

@Entity("prodotto")
export class Prodotto extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("varchar", { length: 30 })
    nome!: string | undefined;

    @OneToMany(type => Barcode, barcode => barcode.code)
    barcode !: Barcode[];

    // scadenza !: string;

    constructor(id?: number, nome?: string){
        super();
        this.id = id;
        this.nome = nome;
    }

    public async getProdotto(conn: Connection, barcode: String): Promise<Prodotto | undefined> {
        return await conn.getRepository(Prodotto)
            .createQueryBuilder("p")
            .leftJoinAndSelect("barcode", "b", "b.prodottoId = p.id")
            .where("b.code = :barcode ", { barcode: barcode })
            .getOne()
        
        // findOne({
        //     where: { barcode: [ barcode ] }, 
        //     relations: ['barcode']
        // })
    }

    public async insertThis(conn: Connection) {
        return await conn.getRepository(Prodotto).insert(this);
    }
}

export default Prodotto;