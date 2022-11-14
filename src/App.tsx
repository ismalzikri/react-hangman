import { useCallback, useEffect, useState } from 'react'
import { HangmanDrawing, HangmanWord } from './components/Hangman'
import { Keyboard } from './components/Keyboard'
import words from './fake_db/wordList.json'

function getWord() {
  return words[Math.floor(Math.random() * words.length )] 
}

function App() {

  const [wordToGuess, setWordToGuess] = useState(getWord)

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const AddGuessedLetter = useCallback(
    (letter: string) => {
      if(guessedLetters.includes(letter) || isLoser || isWinner ) 
      return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    }, 
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    
    const handler = (e: KeyboardEvent) => {
      const key =  e.key

      if(!key.match(/^[a-z]$/)) return

      e.preventDefault()
      AddGuessedLetter(key)

    }

    document.addEventListener('keypress', handler)
    
    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  

  return (
    <div
      style={{
        maxWidth:'800px',
        display:'flex',
        flexDirection:'column',
        gap:'2rem',
        margin:'0 auto',
        alignItems:'center'
      }}
    >
      <div style={{ fontSize:'2rem', textAlign:'center'}}>
        {isWinner && "winner! - Refresh to try again"}
        {isLoser && "Nice try - Refresh to try again"}
      </div>
      <HangmanDrawing 
        numberOfGuesses={incorrectLetters.length}
      />
      <HangmanWord 
        reveal={isLoser}
        guessedLetters={guessedLetters} 
        wordToGuess={wordToGuess} 
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard 
          disabled={ isWinner || isLoser }
          activeLetters={guessedLetters.filter(letter => 
            wordToGuess.includes(letter)  
          )}
          inactiveLetters={incorrectLetters}
          AddGuessedLetter={AddGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
