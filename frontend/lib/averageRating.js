export default reviews => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
  const avg = Math.round((totalRating / reviews.length) * 10) / 10
  return avg
}
