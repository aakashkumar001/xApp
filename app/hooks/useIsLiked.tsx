
const useIsLiked = (userId: string, postId: string, likes: any) => {
    let res:any = []
    likes?.forEach((like :any) => {
        if (like.accountId == userId && like.reel_id == postId) res.push(like)
    });                
    if (typeof res == undefined) return
    return res.length > 0
}

export default useIsLiked