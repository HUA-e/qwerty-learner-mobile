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
const preparedPath = path.join(projectRoot, '.personal-wordbook', '2027KaoYanHongBaoShu.json')
const outputPath = path.join(projectRoot, 'build', 'dicts', '2027KaoYanHongBaoShu.json')

function normalizePhone(phone) {
  return String(phone || '')
    .trim()
    .replace(/^\[|\]$/g, '')
    .replace(/^\/|\/$/g, '')
    .trim()
}

async function findSourcePath() {
  for (const candidate of sourceCandidates) {
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      // Keep looking for the private source copy.
    }
  }
  throw new Error(`找不到个人红宝书源文件。已检查：${sourceCandidates.join('、')}`)
}

async function prepare() {
  const sourcePath = await findSourcePath()
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

  await fs.mkdir(path.dirname(preparedPath), { recursive: true })
  await fs.writeFile(preparedPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8')
  console.log(`个人红宝书预检通过：${words.length} 词`)
}

async function emit() {
  const prepared = JSON.parse(await fs.readFile(preparedPath, 'utf8'))
  if (!Array.isArray(prepared) || prepared.length !== EXPECTED_WORD_COUNT) {
    throw new Error(`预检词书无效：预期 ${EXPECTED_WORD_COUNT}，实际 ${prepared?.length ?? '未知'}`)
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, `${JSON.stringify(prepared, null, 2)}\n`, 'utf8')
  console.log(`个人红宝书已写入构建：${prepared.length} 词`)
}

const mode = process.argv[2]
if (mode === 'prepare') {
  await prepare()
} else if (mode === 'emit') {
  await emit()
} else {
  throw new Error('用法：node scripts/import-personal-wordbook.mjs prepare|emit')
}
