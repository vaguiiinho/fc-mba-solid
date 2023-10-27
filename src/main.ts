import ExpressAdapter from "./infra/http/ExpressAdapter";
import GenerateInvoices from "./aplication/usecase/GenerateInvoices";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import LoggerDecorator from "./aplication/decorator/LoggerDecorator";
import MainController from "./infra/http/MainController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);

const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository, new JsonPresenter()));
const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);
