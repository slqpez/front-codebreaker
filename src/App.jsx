import React, {useEffect, useState} from "react";
import {postNumber,getRandom} from "./services/codeBreaker"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {

  const [number, setNumber] = useState(0)
  const [random, setRandom] = useState(0)
  const [inputValue, setInputValue] = useState(0)
  const [isplaying, setIsPlaying] = useState(false)
  const [match, setMatch]= useState(false)
  const [result, setResult]= useState({
    result:"",
    toMatch:""

  })

const handleInput =(e)=>{
  setInputValue(Number(e.target.value))
}

const handleSubmit = (e)=>{
  if(inputValue){
    setIsPlaying(true)
  
 
    
  }else{
    toast.info('No ingresaste un valor', {
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
   const res = getRandom()
   console.log(res)
  }   
  useEffect(() => {

    const numbers = {number, random:4325}
      postNumber(numbers)
      .then(data => {
        setResult(data.result)
        console.log(data.result.result)
        if(data.result.result === "xxxx"){
          setMatch(true)
          setTimeout(()=>{
            setMatch(false)
          },2000)
         
        }
      }) 
     
},[number])

  return (
    <div className="App">
    <div className="title__container">
      <h1>CodeBreaker</h1>
    </div>
    <div className="form__container">
      <form action="POST" onSubmit={handleSubmit}>
        <label htmlFor="guess-number">Ingresa tu numero de apuesta </label>
        <input id="guess-number" type="number" onChange={handleInput} max="9999" placeholder="Ingresa un número de 4 dígitos." value={inputValue}/>
        <button>Empezar juego</button>
        <button onClick={handleNewGame}>Empezar nuevo juego</button>
      </form>
    </div>
    <div className="guide__container">

      <div>

        {isplaying?<> <p>Tu resultado fue: <b>{result.result}</b></p></>:null}
       
      </div>

      {match?<h3 style={{color:"green"}}>¡GANASTE!</h3>:null}
      <h2>Guía de juego</h2>

      <p>Nuestro juego genera un número aleatorio, tu deber es ingresar un valor de 4 dígitos, para adivinar la secuencia.</p>
      <p>* Si adivinas un valor en su posición, te aparecerá una <b>"X"</b> por cada valor adivinado.</p>
      <p>* Si adivinas un valor pero no en su posición, te aparecerá un <b>"-"</b> por cada valor adivinado.</p>
      <p></p>

    </div>
    <ToastContainer />
  </div>
  )
}

export default App
