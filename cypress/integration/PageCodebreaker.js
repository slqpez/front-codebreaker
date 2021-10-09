 /// <reference types="Cypress"/>

export default class PageCodebreaker{

  constructor(){
    beforeEach(()=>{
      cy.visit("http://localhost:3000")
    })
  }

   renderPage(){
     cy.contains("CodeBreaker")
   } 

    startGame(number){
     cy.get("[placeholder= 'Ingresa un número de 4 dígitos.']").type(number)
     cy.get("[data-cy = btn-play]").click()
     cy.get("[data-cy =btn-new-game]").contains("Empezar nuevo juego")
     cy.contains("Tu resultado fue:")
   } 

   restartGame(){
    cy.get("[placeholder= 'Ingresa un número de 4 dígitos.']").type(1234)
    cy.get("[data-cy = btn-play]").click()
    cy.get("[data-cy =btn-new-game]").click()
    cy.get("[placeholder= 'Ingresa un número de 4 dígitos.']").should('have.value', '');
    cy.get("[data-cy = result-text]").should('not.exist')
   }

   numberLengthHaveToBeFour(number){
    cy.get("[placeholder= 'Ingresa un número de 4 dígitos.']").type(number)
    cy.get("[data-cy = btn-play]").click()
    cy.get(".Toastify").should("exist")

   }

}