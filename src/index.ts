import "./style.css"
import {CharacterEmitter} from "./character-emitter";
import {Random} from "./random";

const container = document.getElementById("tContainer") as HTMLDivElement;

const text = "Hello, world!";
const stringWithImperfections = addSpellingMistakes(text);
const characterEmitter = new CharacterEmitter(stringWithImperfections);

characterEmitter.subscribe((value) => (container.innerText = value), {min: 150, max: 250});

function addSpellingMistakes(text: string): string {
  return text
    .split('')
    .map((value) => {
      return Random.getRandomBoolean(5) ? `${getCloseCharacter(value)}{r}${value}` : value;
    })
    .join('');
}

function getCloseCharacter(char: string): string {
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];

  const row = keyboardLayout.find((row) => row.includes(char.toLowerCase()));

  if (!row) {
    return char; // Return the original character if it's not found on the keyboard
  }

  const col = row.indexOf(char.toLowerCase());
  const adjacents = [row[col - 1], row[col + 1]].filter(Boolean); // Remove undefined values

  const closeChar = adjacents.length
    ? adjacents[Math.floor(Math.random() * adjacents.length)]
    : char;

  return char.toUpperCase() === char ? closeChar.toUpperCase() : closeChar;
}