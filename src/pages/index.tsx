import Head from 'next/head'
import { useState } from 'react';
import { ReactTerminal, TerminalContextProvider } from "react-terminal";

const Header = () => {
    return (
        <div className="flex justify-between w-full border-b-gunMetal border-b">
            <h1 className="text-2xl pb-3 text-white">$ Terminal<span className="text-frogGreen">Froggy</span></h1>
        </div>
    );
}

export default function Home() {
    const [counter, setCounter] = useState<number>(0);

    const lesson = {
        speech: [
            "Welcome to TerminalFroggy!",
            "Try listing all files and folders in your current directory using the `ls` command",
        ],
        completedSpeech: "Wow! Look at you go!",
        commands: {
            ls: <div className="w-full flex justify-start">
                <span className="mr-6">congrats.txt</span>
                <span>super-secret-frogs/</span>
            </div>,
            cd: <span>Slow down froggy, we haven't taught you that yet ;)</span>,
        }
    };

    const incrementSpeech = () => counter + 1 < lesson.speech.length && setCounter(counter + 1);
    const decrementSpeech = () => counter - 1 >= 0 && setCounter(counter - 1);

    const handleCommand = (command: string) => {
        if (Object.keys(lesson.commands).includes(command)) {
            return lesson.commands[command]
        } 
    }

    return (
        <TerminalContextProvider>
            <div className="p-5 h-screen">
                <Head>
                    <title>TerminalFroggy</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Header />

                <main className="p-10 text-white h-full">
                    <h1 className="text-3xl">./Lesson-01_Baby-steps</h1>
                    <div id="terminal-container" className="border border-frogGreen mt-5 h-3/4">
                        <ReactTerminal
                            themes={{
                                nord: {
                                    themeBGColor: "#3b4252",
                                    themeToolbarColor: "#DBDBDB",
                                    themeColor: "#FFFEFC",
                                    themePromptColor: "#eceff4",
                                }

                            }}
                            theme="nord"
                            showControlBar={false}
                            errorMessage="Command not found"
                            prompt="[root@terminalfroggy ~]$ "
                            defaultHandler={handleCommand}
                        />
                    </div>
                    {lesson.speech[counter]}
                    <div className="flex justify-between mt-10">
                        <button onClick={decrementSpeech}>Previous</button>
                        <button onClick={incrementSpeech}>Next</button>
                    </div>
                </main>
            </div>
        </TerminalContextProvider>
    )
}
