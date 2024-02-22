import { CreateLabelDto } from "../models/dto/create-label.dto";
import { EditLabelDto } from "../models/dto/edit-label.dto";
import { LabelModel } from "../models/entities/label.model";
import { LabelResponce } from "../models/response/label-responce.model";
import { LabelsResponce } from "../models/response/labels-responce.model";
import { mainApi } from "./createApi";

export const labelApiSlice = mainApi.injectEndpoints({
    endpoints: builder => ({

        createLabel: builder.mutation<LabelModel, CreateLabelDto>({
            invalidatesTags: ['Labels'],
            query: (body) => ({
              url: 'labels',
              method: 'POST',
              body
            }),
            transformResponse: (responce: LabelResponce) => responce.label
          }),
    
          deleteLabel: builder.mutation<LabelModel[], number>({
            invalidatesTags: ['Labels'],
            query: (id) => ({
              url: `labels/${id}`,
              method: 'DELETE'
            }),
            transformResponse: (responce: LabelsResponce) => responce.labels
          }),
    
          editLabel: builder.mutation<LabelModel, EditLabelDto>({
            invalidatesTags: ['Labels'],
            query: ({id, color, name}) => {
              const body = { color, name }
              return { 
                url: `labels/${id}`,
                method: 'PUT',
                body 
              } 
            },
            transformResponse: (responce: LabelResponce) => responce.label
          }),
    
          getLabels: builder.query<LabelModel[], undefined>({
            providesTags: ['Labels'],
            query: () => 'labels',
            transformResponse: (responce: LabelsResponce) => responce.labels
          }),
    })
})

export const {
  useGetLabelsQuery,
  useEditLabelMutation,
  useDeleteLabelMutation,
  useCreateLabelMutation
} = labelApiSlice