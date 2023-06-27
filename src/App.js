import logo from "./logo.svg";
import "./App.css";

import EasySpeech from "easy-speech";
import { useEffect, useState } from "react";

function App() {
    const init = async () => {
        await EasySpeech.init({ maxTimeout: 5000, interval: 250 })
            .then(() => console.log("load complete"))
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        init();
    }, []);

    const [text, setText] = useState("");

    const speak = async (event) => {
        const voice = EasySpeech.voices().filter(
            (voice) => voice.lang === "en-US"
        )[0];

        await EasySpeech.speak({
            text: text,
            voice: voice, // optional, will use a default or fallback
            pitch: 1,
            rate: 0.8,
            volume: 1,
            // there are more events, see the API for supported events
            boundary: (e) => console.debug("boundary reached"),
        });
    };

    return (
        <div className="App">
            <input
                value={text}
                onChange={(event) => setText(event.target.value)}
            />
            <button onClick={speak}>Speak</button>
            <button onClick={() => console.log(EasySpeech.status())}>
                Status
            </button>
        </div>
    );
}

export default App;
