export const formattedCurrentDate = () => {
  const today = new Date()
  const options = { day: 'numeric', month: 'long', year: 'numeric' } as const
  const formattedDate = today.toLocaleDateString('en-US', options)
  return formattedDate
}

export const generatePageId = () => {
  return Date.now()
}

export const isTextAreaOverflowing = (text: string, textarea: HTMLInputElement | undefined) => {
  console.log('Inside util', textarea)
  if (!textarea) {
    return
  }
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.visibility = 'hidden'
  div.style.width = textarea.offsetWidth + 'px'
  div.style.height = textarea.offsetHeight + 'px'
  div.style.font = getComputedStyle(textarea).font
  div.style.fontSize = getComputedStyle(textarea).fontSize
  div.style.overflow = 'hidden'

  div.textContent = text
  document.body.appendChild(div)

  const isOverflowing = div.scrollHeight > div.offsetHeight

  document.body.removeChild(div)

  return isOverflowing
}
