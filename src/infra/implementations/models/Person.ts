import { Schema, model } from 'mongoose'
import { IPerson } from '@modules/Person/dataModels/IPerson'


const personSchema = new Schema<IPerson>(
  {
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    documentMedia: {
      type: String,
      required: false,
    },
    password: {
      type: String,
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

const Person = model<IPerson>('Person', personSchema, 'person')

export { Person, IPerson }
