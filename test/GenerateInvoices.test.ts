import GenerateInvoices from "../src/aplication/usecase/GenerateInvoices"
import ContractDatabaseRepository from "../src/infra/repository/ContractDatabaseRepository"
import ContractRepository from "../src/aplication/repository/ContractRepository";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";

let contractRepository: ContractRepository
let connection: DatabaseConnection;
let generateInvoices: GenerateInvoices

beforeEach(() => {
    connection = new PgPromiseAdapter();
    contractRepository = new ContractDatabaseRepository(connection);
    generateInvoices = new GenerateInvoices(contractRepository);
})

test("Deve gerar as notas fiscais, por regime de caixa", async function () {
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }
    const output = await generateInvoices.execute(input)
    expect(output.at(0)?.date).toBe("2022-01-05")
    expect(output.at(0)?.amount).toBe(6000)
})

test("Deve gerar as notas fiscais, por regime de Competência", async function () {
    const input = {
        month: 1,
        year: 2022,
    type: "accrual"
    }
    const output = await generateInvoices.execute(input)
    expect(output.at(0)?.date).toBe("2022-01-01")
    expect(output.at(0)?.amount).toBe(500)
})

test("Deve gerar as notas fiscais, por regime de Competência", async function () {
    const input = {
        month: 2,
        year: 2022,
    type: "accrual"
    }
    const output = await generateInvoices.execute(input)
    expect(output.at(0)?.date).toBe("2022-02-01")
    expect(output.at(0)?.amount).toBe(500)
})

afterEach(async () => {
    connection.close();
});
