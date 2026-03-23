import {z} from "zod"

const signupInfoSchema=z.object({
    fullname:z.string().nonempty({message:'full name is required'}).regex(/^[A-Za-z ]+$/,{message:"Full name can contain only uppercase,lowercase characters and spaces"}),
    email:z.string().nonempty({message:"email is required!"}).email({message:"Invalid email!"}),
    phoneNumber:z.string().nonempty({message:'phone number is required'}).length(10,{message:'phone number must be to 10 digits long'}).regex(/^[0-9]+$/,{message:"Invalid phone number!"}),
    password:z.string().nonempty({message:'password is required'}).min(6,{message:"password must be atleast 6 characters long"}),
    role:z.enum(['student','recruiter','superadmin'],{message:'select valid option'})
})


const loginInfoSchema=z.object({
    email:z.string().nonempty({message:'email is required'}).email({message:"Invalid email address"}),
    password:z.string().nonempty({message:'password is required'}).min(6,{message:"password must be 6 characters long"}),
    role:z.enum(['student','recruiter','superadmin'],{message:'select valid option'})
})

const jobInfoSchema=z.object({
        title:z.string().nonempty({message:'title is required'}),
        description:z.string().nonempty({message:'description is required'}) ,
        requirements: z.array(z.string().nonempty({message:'requirements is required'})),
        salary: z.string().nonempty({message:'salary is required'}),
        location: z.string().nonempty({message:'location is required'}),
        jobType: z.string().nonempty({message:'job type is required'}),
        experience:z.string().nonempty({message:'experience is required'}),
        position: z.number(),
})

const companyNameSchema=z.string().nonempty({message:"Company Name can't be empty"})

const companyInfoSchema=z.object({
    name: z.string().nonempty({message:"name is required"}),
    description:z.string().nonempty({message:"description is required"}),
    website:z.string().nonempty({message:"url is required"}).url({message:'invalid url'}),
    location: z.string().nonempty({message:"location is required"}),
})
export {signupInfoSchema,loginInfoSchema,jobInfoSchema,companyNameSchema,companyInfoSchema}