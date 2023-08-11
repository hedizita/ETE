describe('Butopea Website Tests', () => {
  it('should load the website', () => {
    cy.visit('https://butopea.com')
    cy.title().should('include', 'Butopea')
  })

  it('should check for the existence of a specific element', () => {
    cy.visit('https://butopea.com')
    cy.get('.your-element-selector').should('exist')
    
    cy.get('.your-element-selector').invoke('text').then((text) => {
      cy.log('Extracted data:', text)
    })
  })
})
