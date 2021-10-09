import PageCodebreaker from "./PageCodebreaker"

const page = new PageCodebreaker()

describe('Test codebreaker home page',()=>{ 

  it("Can render de home paage",()=>{ 
    page.renderPage()
  })

  it("Can type a number and start the game",()=>{
    page.startGame(1234)
  })

   it("Can restart the game",()=>{
    page.restartGame()
  }) 


  it("Can't put a number greater than 4 digits ",()=>{
    page.numberLengthHaveToBeFour(12589)
  })

  it("Can't put a number less than 4 digits ",()=>{
    page.numberLengthHaveToBeFour(12)
  })
})