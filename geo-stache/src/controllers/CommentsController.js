import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postNewComment)
            .delete('/:commentId', this.deleteCommentByCommentId)

    }
    async deleteCommentByCommentId(req, res, next) {
        try {
            const userId = req.userInfo.id
            const commentId = req.params.commentId
            const deletedComment = await commentsService.deleteCommentByCommentId(commentId, userId)
            return res.send(deletedComment)
        } catch (error) {
            next(error)
        }
    }
    async postNewComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const newComment = await commentsService.postNewComment(req.body)
            return res.send(newComment)
        } catch (error) {
            next(error)
        }
    }
}