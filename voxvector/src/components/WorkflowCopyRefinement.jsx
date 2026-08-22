import { useEffect } from 'react'

const COFFEE = '#c99a66'
const NEW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'

function findLeafByText(root, text) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
  let node
  while ((node = walker.nextNode())) {
    if (node.children.length === 0 && node.textContent?.trim() === text) return node
  }
  return null
}

function replaceTextNodeContent(element, oldText, newText) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  let node
  while ((node = walker.nextNode())) {
    if (node.nodeValue?.includes(oldText)) {
      node.nodeValue = node.nodeValue.replace(oldText, newText)
      return true
    }
  }
  return false
}

function refineWorkflowCopy() {
  const workflow = document.querySelector('#workflow')
  if (!workflow) return

  const heading = findLeafByText(workflow, 'Deep Forensic Vocal Analysis + State of the art Linguistics')
  if (heading && !heading.dataset.vvWorkflowHeading) {
    heading.dataset.vvWorkflowHeading = 'true'
    const phrase = 'State of the art Linguistics'
    const index = heading.textContent.indexOf(phrase)
    if (index >= 0) {
      const before = heading.textContent.slice(0, index)
      const after = heading.textContent.slice(index + phrase.length)
      heading.textContent = ''
      heading.append(document.createTextNode(before))
      const coffee = document.createElement('span')
      coffee.className = 'vv-coffee-copy'
      coffee.textContent = phrase
      heading.append(coffee, document.createTextNode(after))
    }
  }

  const description = findLeafByText(workflow, 'VoxVector keeps reliability, evidence, candidate classification and final disposition separate so a visualization never becomes a scientific claim.')
  if (description && !description.dataset.vvWorkflowDescription) {
    description.dataset.vvWorkflowDescription = 'true'
    description.textContent = NEW_DESCRIPTION
  }

  const action = findLeafByText(workflow, 'Explore the evidence model')
  if (action && !action.dataset.vvWorkflowAction) {
    action.dataset.vvWorkflowAction = 'true'
    replaceTextNodeContent(action, 'Explore the evidence model', 'VoxVector Analysis Methods')
  }
}

export default function WorkflowCopyRefinement() {
  useEffect(() => {
    refineWorkflowCopy()
    const observer = new MutationObserver(refineWorkflowCopy)
    observer.observe(document.body, { childList: true, subtree: true })
    const timeout = window.setTimeout(refineWorkflowCopy, 80)
    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [])
  return null
}
