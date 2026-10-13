import * as z from "zod" 
export const formSchema = z.object({
  email: z
    .string()
    .email("Invalid Email")
    .nonempty("Email Is Required ")
    , 
    
    
  password: z
    .string()
    .nonempty("Password Is Required ")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,'at least 5 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character:')
    
})
