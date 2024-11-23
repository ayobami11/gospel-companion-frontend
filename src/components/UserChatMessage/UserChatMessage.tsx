import styles from "./UserChatMessage.module.css";

interface Props {
    message: string;
}

export const UserChatMessage = ({ message }: Props) => {
    return (
        <div className={styles.container}>
            <div className="p-4 rounded-[1.25rem] rounded-ee-none bg-white text-[hsl(0,0%,8%)] dark:bg-[hsl(0,0%,23%)] dark:text-white">{message}</div>
        </div>
    );
};
