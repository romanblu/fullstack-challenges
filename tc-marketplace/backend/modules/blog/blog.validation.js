
export const validateCreatePost = (data) => {
    if(!data.content){
      throw Error('Content required')
    }
    if(!data.title){
      throw Error('Title required')
    }
}