import { ZapOff } from "lucide-react";

function RateLimited() {
    return (
        <div className="mx-auto w-fit px-10 card mt-10 border border-r-4 border-primary/20 bg-base-100 card-xs shadow-sm">
            <div className="card-body p-4">
                <div className="flex items-center space-between gap-2">
                    <div className="bg-primary/50 rounded-full p-4 mr-4">
                        <ZapOff />
                    </div>
                    <div>
                        <h2 className="card-title font-bold text-xl mb-1">Rate Limited</h2>
                        <p className="font-bold text-base">You have exceeded the rate limit.</p>
                        <p>Please try again later.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RateLimited;