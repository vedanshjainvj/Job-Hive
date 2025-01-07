import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { loginInfoSchema} from '../utils/formValidation';
import OAuth from './OAuth';
const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [error,setError]=useState(null)
    
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateLoginInfo=(loginInfo)=>{
        
        try {
            const validatedInfo=loginInfoSchema.parse(loginInfo)
            setError(null)
            return true;
        } catch (error) {
           const zodError={...error} 
        //    console.log("validation errors: ",zodError.issues)
           setError(zodError.issues.map(err=>err.message))
           return false;
        }
    }
 
    const submitHandler = async (e) => {
        e.preventDefault();

    if(!validateLoginInfo(input))return;
        dispatch(setLoading(true));
        
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center mx-auto max-w-7xl'>
                <form onSubmit={submitHandler} className='w-1/2 p-4 my-10 border border-gray-200 rounded-md'>
                    <h1 className='mb-5 text-xl font-bold'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Example@gmail.com"
                        />
                    </div>

                    <div className='relative my-2'>
                        <Label>Password</Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                        <div
                            className='absolute cursor-pointer right-2 top-9'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <>
                            <Button type="submit" className="w-full my-4">Login</Button>
                            <OAuth/>
                            </> 
                        )
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
            {
                error && error.map((err)=>toast.error(err))
            }
        </div>
    );
};

export default Login;
