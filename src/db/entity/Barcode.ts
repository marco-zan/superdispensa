import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, Connection, ManyToOne } from "typeorm";
import Prodotto from "./Prodotto";

@Entity("barcode")
export class Barcode extends BaseEntity{

    @PrimaryGeneratedColumn()
    code: number | undefined;

    @ManyToOne(type => Prodotto, prodotto => prodotto.id)
    prodotto !: Prodotto;
    
    constructor(code?: number){
        super();
        this.code = code;
    }

    public async insertThis(conn: Connection) {
        return await conn.getRepository(Barcode).save(this);
    }
}

export default Barcode;