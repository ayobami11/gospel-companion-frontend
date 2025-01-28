import { ModeToggle } from "@/app/(home)/mode-toggle";
import { KnowledgeBase } from "./knowledge-base";
import { FormType } from "../page";


export const Header = ({ form }: FormType) => {
    return (
        <header className="p-2.5 flex flex-col items-center gap-4 sm:flex-row sm:items-center">

            <div className="flex gap-4">
                <KnowledgeBase form={form} />

                <ModeToggle />
            </div>

            <h1 className="flex-1 font-bold text-[2rem]">Gospel Companion</h1>

        </header>
    )
}