import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TOKEN_URI,
  authToken: process.env.TURSO_TOKEN,
})

const result = await client.execute('select 1 as ok')
console.log(result.rows)