import { useEffect, useState }  from 'react';

interface IBeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt: () => Promise<void>;
}

export const useAddToHomescreenPrompt = () => {
    const  [promptState, setPromptState] = useState<IBeforeInstallPromptEvent | null>(null);

    const promptToInstall = async () => {
        if (promptState) {
            await promptState.prompt();
            return;
        }

        return Promise.reject(new Error(`Tried installing before browser sent "beforeinstallprompt" event`));
    }

    useEffect(() => {
        const ready = (e: IBeforeInstallPromptEvent) => {
            e.preventDefault();
            setPromptState(e);
        }

        window.addEventListener("beforeinstallprompt", ready as any);
        return () => {
            window.removeEventListener("beforeinstallprompt", ready as any);
        };
    }, []);

    return {
        promptState,
        promptToInstall,
        setPromptState,
    }
}