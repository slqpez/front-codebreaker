import React, {useEffect, useState} from "react";
import {startGame,getRandomNumber} from "./services/codeBreaker"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {

  const [number, setNumber] = useState(0)
  const [random, setRandom] = useState(0)
  const [isWinner,setIsWinner] = useState(false)
  const [inputValue, setInputValue] = useState(" ")
  const [isplaying, setIsPlaying] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [match, setMatch]= useState(false)
  const [result, setResult]= useState({
    result:"",
    toMatch:""

  })

const handleInput =(e)=>{
  setInputValue(e.target.value)
}


useEffect(()=>{
  getRandomNumber()
  .then(data=>setRandom(data.number))
},[])

const handleSubmit = (e)=>{
  
  if(inputValue.toString().length == 4){
    setIsPlaying(true)
    setGameStarted(true)
  }else{
    toast.info('Ingresa un número de 4 dígitos.', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
  }
  e.preventDefault()
  setNumber(inputValue)
  }


  const handleNewGame = async (e)=>{
    e.preventDefault()
    setGameStarted(false)
    setIsPlaying(false)
    setIsWinner(false)
    setInputValue(" ")
   const data = await getRandomNumber()
   setRandom(data.number)
  }   
  useEffect(() => {

    const numbers = {number, random}
    startGame(numbers)
      .then(data => {
        setResult(data.values)
        if(data.values.result === "xxxx"){
          setMatch(true)
          setIsWinner(true)
          setTimeout(()=>{
            setMatch(false)
          },2000)
         
        }
      }) 
     
},[number,random])


  return (
    <div className="App">
    <div className="title__container">
      <h1>CodeBreaker</h1>
    </div>
    <div className="form__container">
      <form action="POST" onSubmit={handleSubmit}>
        <label htmlFor="guess-number">Ingresa tu numero de apuesta </label>
        <input id="guess-number" type="number" onChange={handleInput} placeholder="Ingresa un número de 4 dígitos." value={inputValue}/>
        {isWinner?null:<button data-cy ="btn-play">{isplaying?"Intentar de nuevo":"Jugar"}</button>}
        {gameStarted?<button data-cy="btn-new-game" onClick={handleNewGame}>Empezar nuevo juego</button>:null}
      </form>
    </div>
    <div className="guide__container">

      <div>

        {isplaying?<> <p data-cy="result-text">Tu resultado fue: <b>{result.result}</b></p></>:null}
       
      </div>

      {match?<h3 style={{color:"green"}}>¡GANASTE!</h3>:null}
      <h2>Guía de juego</h2>

      <p>Nuestro juego genera un número aleatorio, tu deber es ingresar un valor de 4 dígitos, para adivinar la secuencia.</p>
      <p>* Si adivinas un valor en su posición, te aparecerá una <b>"X"</b> por cada valor adivinado.</p>
      <p>* Si adivinas un valor pero no en su posición, te aparecerá un <b>"-"</b> por cada valor adivinado.</p>
      <p></p>

    </div>
    <ToastContainer data-cy="alert-modal" />
  </div>
  )
}

export default App
