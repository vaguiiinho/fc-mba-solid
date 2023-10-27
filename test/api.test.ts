import axios from "axios";
import LoggerDecorator from "../src/aplication/decorator/LoggerDecorator";
import GenerateInvoices from "../src/aplication/usecase/GenerateInvoices";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import ExpressAdapter from "../src/infra/http/ExpressAdapter";
import MainController from "../src/infra/http/MainController";
import ContractDatabaseRepository from "../src/infra/repository/ContractDatabaseRepository";
import JsonPresenter from "../src/infra/presenter/JsonPresenter";

test("Deve gerar as faturas pela api", async function () {
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }
    const response = await axios.post("http://localhost:3000/generate_invoices", input);
    const output = response.data;
    expect(output.at(0)?.date).toBe("2022-01-05T10:00:00.000Z");
    expect(output.at(0)?.amount).toBe(6000);
});
