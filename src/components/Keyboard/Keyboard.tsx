import styles from './Keyboard.module.scss'
import KEYS from '../../fake_db/keywordList.json'

type KeyboardProps = {
  disabled?: boolean
  activeLetters: string[]
  inactiveLetters: string[]
  AddGuessedLetter: (letter: string) => void
}

export const Keyboard = ({disabled = false, activeLetters, inactiveLetters, AddGuessedLetter }: KeyboardProps) => {

  return (
    <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(75px, 1fr))",
        gap:".5rem"
      }}
    >
     {KEYS.map(key => {

      const isActive = activeLetters.includes(key)
      const isInActive = inactiveLetters.includes(key) 

      return (
        <button 
          onClick={() => AddGuessedLetter(key)}
          className={`${styles.btn} ${isActive ? styles.active : ""} 
          ${
            isInActive ? styles.inactive : ""
           }`}
           disabled={isInActive || isActive || disabled} 
          key={key}
        >
          {key}
        </button>
      ) 
     })}
    </div>
  )
}
