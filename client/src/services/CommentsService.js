import { AppState } from "../AppState"
import { StacheComment } from "../models/StacheComment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"





class CommentsService {

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        // logger.log(res.data)
        let newComment = new StacheComment(res.data)
        AppState.stacheComments.unshift(newComment)

    }

    async getCommentsByStache(stacheId) {
        const res = await api.get(`api/staches/${stacheId}/comments`)
        // logger.log('getting comments', res.data)
        AppState.stacheComments = res.data

    }

    async removeComment(id) {
        const res = await api.delete(`api/comments/${id}`)
        // logger.log(res.data, 'deleting')
        let indexRemove = AppState.stacheComments.findIndex(c => c.id == id)
        AppState.stacheComments.splice(indexRemove, 1)
    }

}


export const commentsService = new CommentsService()