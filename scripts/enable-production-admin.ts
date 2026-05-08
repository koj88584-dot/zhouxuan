import { spawnSync } from 'node:child_process'
import process from 'node:process'
import pg from 'pg'

const { Client } = pg

function readArg(name: string) {
  const prefix = `${name}=`
  const match = process.argv.find((arg) => arg.startsWith(prefix))
  return match?.slice(prefix.length)
}

function isLocalDatabase(databaseUrl: string) {
  return /@(127\.0\.0\.1|localhost)(:|\/)/i.test(databaseUrl)
}

function runNetlify(args: string[], env?: Record<string, string | undefined>) {
  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx'
  const result = spawnSync(command, ['--yes', 'netlify-cli@latest', ...args], {
    env: {
      ...process.env,
      ...env,
    },
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    throw new Error(`Netlify command failed: netlify ${args.join(' ')}`)
  }
}

async function verifyDatabase(databaseUrl: string) {
  const client = new Client({
    connectionString: databaseUrl,
    ssl: isLocalDatabase(databaseUrl) ? undefined : { rejectUnauthorized: false },
  })

  try {
    await client.connect()
    await client.query('select 1')
  } finally {
    await client.end().catch(() => undefined)
  }
}

const databaseUrl = readArg('--database-url') || process.env.DATABASE_URL
const shouldDeploy = !process.argv.includes('--no-deploy')

if (!databaseUrl) {
  console.error('Missing DATABASE_URL. Pass --database-url=postgresql://... or set DATABASE_URL first.')
  process.exit(1)
}

if (isLocalDatabase(databaseUrl)) {
  console.error('Refusing to enable production admin with a local Postgres URL.')
  process.exit(1)
}

console.log('Verifying production Postgres connection...')
await verifyDatabase(databaseUrl)
console.log('Database connection verified.')

console.log('Writing Netlify production admin environment...')
runNetlify(['env:set', 'DATABASE_URL', databaseUrl, '--force'])
runNetlify(['env:set', 'PAYLOAD_DATABASE_DISABLED', '0', '--force'])

if (shouldDeploy) {
  console.log('Deploying production admin with database enabled...')
  runNetlify(['deploy', '--prod', '--build', '--skip-functions-cache'], {
    DATABASE_URL: databaseUrl,
    PAYLOAD_DATABASE_DISABLED: '0',
  })
}

console.log('Production admin is configured. Open /admin/create-first-user to finish setup if no admin exists yet.')
