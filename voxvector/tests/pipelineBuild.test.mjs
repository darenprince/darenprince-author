import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../src/components/PipelineBuildCard.jsx', import.meta.url), 'utf8')

test('Developer Console pipeline card uses canonical Stage 05 and Stage 06 order', () => {
  const speech = source.indexOf("['05', 'speech_segmentation', 'Speech Segmentation'")
  const diarization = source.indexOf("['06', 'speaker_identification_diarization', 'Speaker Identification / Diarization'")
  assert.ok(speech >= 0, 'Stage 05 Speech Segmentation missing')
  assert.ok(diarization > speech, 'Stage 06 diarization must follow Stage 05 speech segmentation')
})

test('Developer Console pipeline card prefers backend status_by_stage and normalizes implemented variants', () => {
  assert.match(source, /livePipeline\.status_by_stage/)
  assert.match(source, /statusByStage\[id\] \|\| fallbackState/)
  assert.match(source, /state\.startsWith\('implemented'\)/)
  assert.match(source, /\['07', 'transcription_generation', 'Transcription Generation', 'implemented_foundation'/)
  assert.match(source, /\['08', 'transcript_alignment', 'Transcript Alignment', 'implemented_foundation'/)
})

test('Developer Console pipeline card does not falsely mark Stage 01 current when runtime has no exact current-stage token', () => {
  assert.doesNotMatch(source, /STAGES\.find\(stage => stage\[2\] === 'implemented'\)/)
  assert.match(source, /Boolean\(currentToken\)/)
})
