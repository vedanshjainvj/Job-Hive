import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Skeleton } from './ui/skeleton'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";
    const { user } = useSelector(store=>store.auth);
    const { isLoading } = useSelector(store=>store.job);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                <p className='text-sm text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full h-8 w-8" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex flex-col md:flex-row items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                    {
                        isLoading ? <Skeleton className="w-10 h-10 rounded-full bg-gray-400" /> : <AvatarImage src={job?.company?.logo} />
                    }
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex flex-col md:flex-row items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-medium hover:bg-blue-700 hover:text-white'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-medium hover:bg-[#F83002] hover:text-white'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-medium hover:bg-[#7209b7] hover:text-white'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex flex-col md:flex-row items-center gap-4 mt-4'>
                <Button
                 onClick={()=> user ? navigate(`/description/${job?._id}`): navigate('/login')} 
                 variant="outline" className='bg-slate-50 text-gray-800 hover:bg-slate-100 text-sm'>Details</Button>
                <Button className="bg-[#7209b7] text-sm hover:bg-[#7209b7]/80">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job