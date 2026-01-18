import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const sourcePath = path.join(rootDir, 'src', 'nexuswho', 'index.html')
const targetPath = path.join(rootDir, 'nexuswho.html')

const sourceHtml = await readFile(sourcePath, 'utf8')
await writeFile(targetPath, sourceHtml)

console.log('Prepared nexuswho.html from src/nexuswho/index.html')
