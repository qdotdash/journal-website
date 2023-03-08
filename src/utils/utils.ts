const getSingleCharWidth = (fontSize: number, fontFamily: string) => {
  const dummy = document.createElement('span')
  dummy.innerText = 'x'
  dummy.style.fontSize = `${fontSize}px`
  dummy.style.fontFamily = fontFamily
  document.body.appendChild(dummy)
  const width = dummy.offsetWidth
  document.body.removeChild(dummy)
  return width
}

export const calculateMaxChars = (textarea: HTMLInputElement) => {
  const style = window.getComputedStyle(textarea)
  const fontSize = parseInt(style.getPropertyValue('font-size'))
  const lineHeight = parseInt(style.getPropertyValue('line-height'))
  const fontFamily = style.getPropertyValue('font-family')
  const singleCharWidth = getSingleCharWidth(fontSize, fontFamily)
  const clientWidth = textarea.clientWidth
  const clientHeight = textarea.clientHeight
  const maxChars = Math.ceil(clientWidth * clientHeight) / (singleCharWidth * lineHeight)
  return maxChars
}

export const formattedCurrentDate = () => {
  const today = new Date()
  const options = { day: 'numeric', month: 'long', year: 'numeric' } as const
  const formattedDate = today.toLocaleDateString('en-US', options)
  return formattedDate
}

export const generatePageId = () => {
  return Date.now();
}
