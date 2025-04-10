import {useEffect} from "react";

const SentMessage = ({ message }: { message: string }) => {

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    }, []);

    return (
        <div className="bg-stone-200 rounded-[1.25rem] rounded-ee-none w-fit self-end py-3 px-4 dark:bg-[hsl(0,0%,23%)] dark:text-white">
            {message}
        </div>
    )
}

export default SentMessage;