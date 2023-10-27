import ContractRepository from "../../aplication/repository/ContractRepository";

import pgp from "pg-promise";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ContractDatabaseRepository implements ContractRepository {

    constructor(readonly connection: DatabaseConnection) {
    }

    async list(): Promise<any[]> {
        const contracts = [];
        const contractsData = await this.connection.query("select * from branas.contract", []);
        for (const contractData of contractsData) {

            contracts.push(contractData)

        }
        return contracts;
    }

};
