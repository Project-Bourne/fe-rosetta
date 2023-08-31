import Link from "next/link";
import { useTruncate } from "@/components/custom-hooks";
import { ActivityCardModel } from "@/global/users.module";

export function ActivityCard({ time, actionText, activityText, docId }: ActivityCardModel) {
    return(
        <div className="w-[90%] mt-[2rem] grid md:flex gap-x-2 mx-auto">
            <h3 className="text-[14px] text-[#6F7A82]">{time}</h3>
            <div className="w-full grid rounded-2xl bg-[#F9F9F9] p-6">
                <div>
                    <h2 className="inline-block rounded-2xl border-[1px] border-gray-300 bg-white mb-2 px-2 py-1 text-[14px]">SIRP</h2>
                </div>
                <div className="grid md:flex justify-between items-center">
                    <div className="flex gap-x-3">
                        <label className="text-[13px] text-sirp-grey">Action:</label>
                        <p className="text-[14px]">{useTruncate(actionText, 35)}</p>
                    </div>
                    <div className="flex gap-x-3">
                        <label className="text-[13px] text-sirp-grey">Snippet:</label>
                        <p className="text-[14px]">{useTruncate(activityText, 70)}</p>
                    </div>
                    <div className="py-1 px-2 rounded-xl bg-white text-[12px] text-sirp-primary border-[1px] border-gray-300 cursor-pointer">
                        <Link href={`/${docId}`}>view doc</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}