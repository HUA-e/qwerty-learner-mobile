import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const EXPECTED_WORD_COUNT = 5675
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceCandidates = [
  process.env.PERSONAL_WORDBOOK_SOURCE,
  path.join(os.homedir(), 'Projects', 'english-app', 'public', '词书', '2027-e582.json'),
  path.join(os.homedir(), 'Projects', 'english-app', 'dist', '词书', '2027-e582.json'),
].filter(Boolean)
const outputPath = path.join(projectRoot, 'build', 'dicts', '2027KaoYanHongBaoShu.json')

let sourcePath
for (const candidate of sourceCandidates) {
  try {
    await fs.access(candidate)
    sourcePath = candidate
    break
  } catch {
    // Keep looking for the private source copy.
  }
}
if (!sourcePath) {
  throw new Error(`找不到个人红宝书源文件。已检查：${sourceCandidates.join('、')}`)
}

function normalizePhone(phone) {
  return String(phone || '')
    .trim()
    .replace(/^\[|\]$/g, '')
    .replace(/^\/|\/$/g, '')
    .trim()
}

const source = JSON.parse(await fs.readFile(sourcePath, 'utf8'))
if (!Array.isArray(source.words) || source.words.length !== EXPECTED_WORD_COUNT) {
  throw new Error(`红宝书词数异常：预期 ${EXPECTED_WORD_COUNT}，实际 ${source.words?.length ?? '未知'}`)
}

const words = source.words.map((entry, index) => {
  const name = String(entry.w || '').trim()
  const meaning = String(entry.m || '').trim()
  const phone = normalizePhone(entry.p)
  if (!name || !meaning) {
    throw new Error(`红宝书第 ${index + 1} 条缺少单词或释义`)
  }
  return {
    name,
    trans: [meaning],
    usphone: phone,
    ukphone: phone,
  }
})

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8')

const written = JSON.parse(await fs.readFile(outputPath, 'utf8'))
if (written.length !== EXPECTED_WORD_COUNT) {
  throw new Error(`写入校验失败：预期 ${EXPECTED_WORD_COUNT}，实际 ${written.length}`)
}

console.log(`个人红宝书已生成：${written.length} 词 → ${outputPath}`)
