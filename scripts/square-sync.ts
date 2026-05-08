import { runSquareSync } from '@/lib/square'

const summary = await runSquareSync()
console.log(JSON.stringify(summary, null, 2))
