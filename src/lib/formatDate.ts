export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-Us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
  })

  return formatter.format(date)
}
