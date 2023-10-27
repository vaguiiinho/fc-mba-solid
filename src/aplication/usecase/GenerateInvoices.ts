import moment from "moment";
import pgp from "pg-promise";
import ContractRepository from "../repository/ContractRepository";

export default class GenerateInvoices {

    constructor(readonly contractRepository: ContractRepository) {}

    async execute(input: Input): Promise<Output[]> {
        const connection = pgp()("postgres://postgres:postgres@db:5432/app")
        const output: Output[] = []
        const contracts = await this.contractRepository.list()
        for (const contract of contracts) {
            const payments = await connection.query("select * from branas.payment where id_contract = $1",
            [contract.id_contract])
            if (input.type === "cash") {
                for (const payment of payments) {
                    if (payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !==
                        input.year) continue
                    output.push({
                        date: moment(payment.date).format("YYYY-MM-DD"),
                        amount: parseFloat(payment.amount)
                    })
                }
            }
            if (input.type === "accrual") {
                let period = 0
                while (period <= contract.periods) {
                    const date = moment(contract.date).add(period++, "months").toDate()
                    if (date.getMonth() + 1 !== input.month || date.getFullYear() !==
                        input.year) continue
                    const amount = parseFloat(contract.amount) / contract.periods
                    output.push({ date: moment(date).format("YYYY-MM-DD"), amount })
                }
            }

        }
        await connection.$pool.end()
        return output
    }
}

type Input = {
    month: number,
    year: number,
    type: string
}

type Output = {
    date: string,
    amount: number
}
