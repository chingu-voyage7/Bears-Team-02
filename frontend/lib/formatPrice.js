const PRICE = ['FREE', 'LOW', 'MID', 'HIGH']

const formatPrice = p => {
  const i = PRICE.indexOf(p)
  if (i === 0) return 'FREE'
  if (i === 1) return '$'
  if (i === 2) return '$$'
  if (i === 3) return '$$$'
  return null
}

export default formatPrice
