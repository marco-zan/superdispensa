import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany } from "typeorm";

@Entity("barcode")
export class Barcode extends BaseEntity{

    @PrimaryGeneratedColumn()
    code: number | undefined;

    constructor(code?: number){
        super();
        this.code = code;
    }
}

export default Barcode;