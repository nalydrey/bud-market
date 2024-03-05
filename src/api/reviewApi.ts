import { CreateReviewDto } from "../models/dto/create-review.dto";
import { ReviewModel } from "../models/entities/review.model";
import { ReviewResponce } from "../models/response/review-responce.model";
import { mainApi } from "./createApi";

export const reviewApiSlice = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation<ReviewModel, CreateReviewDto>({
            query: (body) => ({
                url: '/reviews',
                method: 'POST',
                body
            }),
            transformResponse: (responce: ReviewResponce) => responce.review
        })
    })
})

export const {
    useCreateReviewMutation
} = reviewApiSlice