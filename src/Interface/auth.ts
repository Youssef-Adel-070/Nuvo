export interface SuccessLoginResponse{ 
    message:string,
    user:UserResponse
    token:string
}
export interface FailLoginResponse{ 
    message:string,
    statusMsg:string
} 
export interface UserResponse{ 
        name:string,
        email:string,
        role:string
    }
