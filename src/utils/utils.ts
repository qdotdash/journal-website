export const formattedCurrentDate = () => {
  const today = new Date()
  const options = { day: 'numeric', month: 'long', year: 'numeric' } as const
  const formattedDate = today.toLocaleDateString('en-US', options)
  return formattedDate
}

export const generatePageId = () => {
  return Date.now();
}
