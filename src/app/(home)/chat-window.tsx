"use client"

import SentMessage from "@/app/(home)/sent-message";
import ReceivedMessage from "@/app/(home)/received-message";

export const ChatWindow = () => {

    return (
        <div className="flex flex-col gap-4 m-4">
            <SentMessage
                message="Tell me about the root of evil"
            />
            <ReceivedMessage
                message={
                    `The concept of the "root of evil" has been explored in philosophy, religion, psychology, and sociology, often as a way to understand the origins of harmful or malevolent behavior. Here are some perspectives:
1. Religious Interpretations
Christianity: The Bible refers to "the love of money" as the "root of all evil" (1 Timothy 6:10). This phrase highlights greed and materialism as primary causes of sinful behavior.
Other Faiths: In Buddhism, tanha (craving) and ignorance are seen as roots of suffering and evil, leading individuals away from enlightenment.
2. Philosophical Perspectives
Human Nature: Philosophers like Thomas Hobbes argued that human beings have selfish and destructive tendencies in their natural state, which society needs to regulate.
Power and Corruption: Friedrich Nietzsche explored how the will to power can lead to destructive acts when unchecked.
3. Psychological Roots
Fear and Insecurity: Fear of loss or insecurity about oneself can drive people to harmful behaviors.
Trauma and Upbringing: Psychological research often points to early childhood experiences, including neglect or abuse, as factors contributing to harmful tendencies in adulthood.
4. Societal and Structural Causes
Inequality and Oppression: Many argue that systemic issues, such as poverty, discrimination, and lack of opportunity, are the roots of much evil in society.
Cultural Norms: Societal values that glorify competition, aggression, or domination can perpetuate harm.`
                }
            />
        </div>
    )
}