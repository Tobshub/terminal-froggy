import Head from "next/head";
import { useState } from "react";
import { api } from "@/utils/api";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";

const Header = () => {
  return (
    <div className="flex w-full justify-between border-b border-b-gunMetal">
      <h1 className="pb-3 text-2xl text-white">
        $ Terminal<span className="text-frogGreen">Froggy</span>
      </h1>
    </div>
  );
};

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [counter, setCounter] = useState<number>(0);

  const lesson = {
    speech: [
      "Welcome to TerminalFroggy!",
      "Try listing all files and folders in your current directory using the `ls` command",
    ],
    completedSpeech: "Wow! Look at you go!",
    commands: {
      ls: (
        <div className="flex w-full justify-start">
          <span className="mr-6">congrats.txt</span>
          <span>super-secret-frogs/</span>
        </div>
      ),
      cd: <span>Slow down froggy, we haven't taught you that yet ;)</span>,
    },
  };

  const incrementSpeech = () =>
    counter + 1 < lesson.speech.length && setCounter(counter + 1);
  const decrementSpeech = () => counter - 1 >= 0 && setCounter(counter - 1);

  const handleCommand = (command: string) => {
    if (command in lesson.commands) {
      // @ts-ignore
      return lesson.commands[command];
    }
  };

  return (
    <TerminalContextProvider>
      <div className="h-screen p-5">
        <Head>
          <title>TerminalFroggy</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="h-full p-10 text-white">
          <h1 className="text-3xl">./Lesson-01_Baby-steps</h1>
          <div
            id="terminal-container"
            className="mt-5 h-3/4 border border-frogGreen"
          >
            <ReactTerminal
              themes={{
                nord: {
                  themeBGColor: "#3b4252",
                  themeToolbarColor: "#DBDBDB",
                  themeColor: "#FFFEFC",
                  themePromptColor: "#eceff4",
                },
              }}
              theme="nord"
              showControlBar={false}
              errorMessage="Command not found"
              prompt="[root@terminalfroggy ~]$ "
              defaultHandler={handleCommand}
            />
          </div>
          {lesson.speech[counter]}
          <div className="mt-10 flex justify-between">
            <button onClick={decrementSpeech}>Previous</button>
            <button onClick={incrementSpeech}>Next</button>
          </div>
        </main>
      </div>
    </TerminalContextProvider>
  );
}
