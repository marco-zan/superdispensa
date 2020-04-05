import { createConnection, Connection, EntitySchema, Repository, ConnectionOptions } from "typeorm";
import Entities from "./entity";

export class Dbservice {
	private static instance: Dbservice | undefined;
	private connection !: Connection;
	private mongodbConnection !: Connection;

	private constructor() {
	}

	static async getInstance() {
		if (this.instance === undefined) {
			this.instance = new Dbservice();
			try{
				await this.instance.setup();
			}catch(e){
				this.instance = undefined;
				throw e;
			}
		}

		return this.instance;
	}

	public async setup() {
		this.connection = await createConnection({
            name: "mysql",
            "type": "mysql",
            "host": "localhost",
            "port": 3307,
            "username": "root",
            "password": "",
            "database": "superdispensa",
            "entities": Entities,
            "logger": "simple-console",
            "synchronize": true
        });

	}

	public getConnection() {
		return this.connection;
	}
}