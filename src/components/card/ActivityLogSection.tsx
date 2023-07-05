import { Button, Input } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { ActivityCard } from "./ActivityCard";

export  default function ActivityLogSection() {
    return (
        <div className='pt-4 w-full mt-3'>
            <div className='flex flex-wrap justify-between w-full items-center'>
                <div className="flex gap-x-3 px-8 items-center">
                    <h2 className='font-semibold text-[14px] '>Activity Log</h2>
                    <div className='bg-sirp-lightGrey cursor-pointer flex p-2 rounded-lg items-center justify-center content-center'>
                        <Image
                            src={require("../../assets/icons/filter.svg")}
                            alt="Filter"
                            width={18}
                            height={18}
                            className='self-center'
                            style={{alignSelf: 'center'}}
                            priority
                        />
                    </div>
                </div>
                <div className="px-2 md:mr-8 text-[12px] rounded-lg text-[#9F9036] shadow-sm shadow-gray-400/[0.3] border-[1px] border-gray-400" >
                    <Link href={''}>See all</Link>
                </div>
            </div>
            <div>
                <ActivityCard 
                    time={'9:00PM'}
                    actionText={'Uploaded documents to SIRP'}
                    activityText={'Redesigned Naira: CBN launches Cash Swap Programme for rural '}
                    docId={2}
                />
            </div>
        </div>
    )
}