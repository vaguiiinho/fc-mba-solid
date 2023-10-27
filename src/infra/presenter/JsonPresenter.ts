import Presenter from "../../aplication/presenter/Presenter";
import { Output } from "../../aplication/usecase/GenerateInvoices";


export default class JsonPresenter implements Presenter {

	present(output: Output[]): any {
		return output;
	}

}
