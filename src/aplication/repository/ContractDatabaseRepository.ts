import ContractRepository from "./ContractRepository";

import pgp from "pg-promise";

export default class ContractDatabaseRepository implements ContractRepository {
   async list(): Promise<any[]> {
        const connection = pgp()("postgres://postgres:postgres@db:5432/app")
        const contracts = await connection.query("select * from branas.contract", [])
        await connection.$pool.end()
        return contracts
    }
    
};
