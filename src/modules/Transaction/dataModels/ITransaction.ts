import { IAccount } from "@modules/Account/dataModels/IAccount"
export interface ITransaction {
  id: string
  receiverAccount: IAccount
  senderAccount: IAccount
  value: number
  createdAt: Date
}
