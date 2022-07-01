import { IPerson } from "@modules/Person/dataModels/IPerson"
export interface IAccount {
  id: string
  personId: IPerson
  email: string
  password: string
  balance?: number
  createdAt: Date
}
