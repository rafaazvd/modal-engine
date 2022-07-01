import mongoose from 'mongoose'

export default async function db() {
  if (!process.env.DN_MONGO_URI) throw new Error('DN_MONGO_URI env is missing')

  await mongoose.connect(process.env.DN_MONGO_URI)

  console.log('--> Database connection done')
}
