type HangmanWordProps = {
  reveal: boolean,
  wordToGuess: string
  guessedLetters: string[],
}

export const HangmanWord = ({reveal = false, guessedLetters, wordToGuess }: HangmanWordProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25rem",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter) || reveal
                ? "visible"
                : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black"
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};
