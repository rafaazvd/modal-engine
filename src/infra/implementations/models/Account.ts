import { Schema, model } from 'mongoose'
import { IAccount } from '@modules/Account/dataModels/IAccount'


const accountSchema = new Schema<IAccount>(
  {
    personId: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  { versionKey: false, id: true }
)

const Account = model<IAccount>('Account', accountSchema, 'account')

export { Account, IAccount }
