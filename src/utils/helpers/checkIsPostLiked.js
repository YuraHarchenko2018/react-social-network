const checkIsPostLiked = (likes, authUserId) => {
  let isLiked = false

  for (let i = 0; i < likes.length; i += 1) {
    const userIdLike = likes[i].user.id
    isLiked = userIdLike === authUserId
  }

  return isLiked
}

export default checkIsPostLiked
