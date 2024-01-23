import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService {
    async deleteCommentByCommentId(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest(`Comment id:${commentId} not found.`)
        }
        if (userId != comment.creatorId) {
            throw new Forbidden(`user id:${userId} does not have permission to delete this ticket.`)
        }
        await comment.remove()
        return comment
    }
    async findCommentsByStacheId(stacheId) {
        const comments = await dbContext.Comments.find({ stacheId }).populate('creator stache')
        return comments
    }
    async postNewComment(body) {
        const newComment = await dbContext.Comments.create(body)
        await newComment.populate('creator stache')
        return newComment
    }

}

export const commentsService = new CommentsService()