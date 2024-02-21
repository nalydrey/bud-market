import { PhotoModel } from "../models/entities/photo.model";


export const usePhotoLoad = () => {

   const loadPhoto = async (files: FileList) => {
        const formData = new FormData()
        const fileArr = Array.from(files);
        
        fileArr.forEach(file => formData.append('file', file))
        
        const resp = await fetch('http://localhost:3030/api/photos', {
            method: 'POST',
            body: formData
        })
        const json = await resp.json()
        return json as {photos: PhotoModel[]}
    }

    return {
        loadPhoto
    }

}