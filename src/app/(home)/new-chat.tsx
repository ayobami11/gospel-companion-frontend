import { Button } from "@/components/ui/button";

export const NewChat = () => {
    return (
        <div className="text-center p-4 min-h-[75vh] flex flex-col justify-center items-center">
            <p className="font-bold text-[2.5rem] mb-2">What would you like to ask?</p>
            <ul className="flex flex-wrap justify-center gap-4">
                <li>
                    <Button
                        variant="outline"
                        className="bg-white border border-[hsl(0,0%,86%)] p-2.5 rounded-[100px] text-base"
                    >Some question sample</Button>
                </li>
                <li>
                    <Button
                        variant="outline"
                        className="bg-white border border-[hsl(0,0%,86%)] p-2.5 rounded-[100px] text-base"
                    >More question samples</Button>
                </li>
                <li>
                    <Button
                        variant="outline"
                        className="bg-white border border-[hsl(0,0%,86%)] p-2.5 rounded-[100px] text-base"
                    >More question samples</Button>
                </li>
            </ul>
        </div>
    )
}