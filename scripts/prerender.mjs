// Scrive home e privacy dentro l'HTML della build e aggiunge i dati strutturati.
// Blocca la build se la configurazione non passa i controlli di interfacce.md §6.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const server = await import(resolve(root, 'dist-ssr/entry-server.js'))

const problems = server.configProblems()
if (problems.length > 0) {
  process.stderr.write(`Configurazione non valida:\n- ${problems.join('\n- ')}\n`)
  process.exit(1)
}

async function inject(file, html, extraHead = '') {
  const path = resolve(root, 'dist', file)
  const source = await readFile(path, 'utf8')
  if (!source.includes('<!--app-->')) throw new Error(`segnaposto <!--app--> assente in ${file}`)
  const output = source
    .replace('<!--app-->', html)
    .replace('<!--structured-data-->', extraHead)
  await writeFile(path, output)
}

await inject('index.html', server.renderHome(), server.structuredDataScripts())
await inject('privacy-policy/index.html', server.renderPrivacy())
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
process.stdout.write('Prerender completato: index.html, privacy-policy/index.html\n')
