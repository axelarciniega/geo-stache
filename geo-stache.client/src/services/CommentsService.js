import { AppState } from "../AppState"
import { StacheComment } from "../models/StacheComment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"





class CommentsService{

    async createComment(commentData){
        const res = await api.post('api/comments', commentData)
        logger.log(res.data)
        let newComment = new StacheComment(res.data)
        AppState.stacheComments.push(newComment)

    }

    async getCommentsByStache(stacheId){
        const res = await api.get(`api/staches/${stacheId}/comments`)
        logger.log('getting comments', res.data)
        AppState.stacheComments = res.data

    }

}


export const commentsService = new CommentsService()