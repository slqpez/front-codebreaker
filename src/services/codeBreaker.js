const BASE_URL = "http://localhost:4000/api/codebreaker";

export  async function startGame(numbers) {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numbers)
    });
    const data = await res.json()
    return data;
  } catch (error) {
      console.log(error)
  }
  
}

export async function getRandomNumber(){
  try {
    const res = await fetch(`${BASE_URL}`)
    const data = await res.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}