import { startApp } from './app'

const serverPort = 3333

startApp()
  .then((app) =>
    app
      .listen(serverPort)
      .then(() => console.log(`--> Server started on port ${serverPort}!`))
      .catch((err) => {
        console.log(err)
        process.exit(1)
      })
  )
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
