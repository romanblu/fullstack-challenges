

export const validateRegister = (data) => {
    if(!data.email){
        throw new Error("Missing email")
    }
    if(!data.name){
        throw new Error("Missing name")
    }
    if(!data.password){
        throw new Error("Missing password")
    }
    
}


export const validateLogin = (data) => {
    if(!data.email){
        throw new Error("Missing email")
    }
    if(!data.password){
        throw new Error("Missing password")
    }
}