import { Schema, model } from 'mongoose'
import { ITransaction } from '@modules/Transaction/dataModels/ITransaction'


const transactionSchema = new Schema<ITransaction>(
  {
    receiverAccount: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    senderAccount: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    value: {
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

const Transaction = model<ITransaction>('Transaction', transactionSchema, 'transaction')

export { Transaction, ITransaction }
