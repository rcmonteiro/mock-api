import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: 4001,
  })
  .then(() => {
    console.log('')
    console.log('🤘 Mock API is running!')
  })
