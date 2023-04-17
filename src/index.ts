import "./style.css"
import {CharacterEmitter} from "./character-emitter";

const container = document.getElementById("tContainer") as HTMLDivElement;
const emitter = new CharacterEmitter("Hello, wp{r}orld!");
emitter.subscribe((value) => (container.innerText = value), 150);