describe('Homepage Tests', () => {
    beforeEach(() => {
      cy.visit('https://butopea.com');
      cy.intercept('POST', '/api/cart/create?token=*').as('createCart');
      cy.intercept('GET', '/api/menuImages').as('getMenuImages');
      // Add more intercepts if needed for other network requests
    });
  
    it('should check middle square content', () => {
      cy.wait(['@createCart', '@getMenuImages']);
      
      cy.get('.banner-square-overlay-heading.secondary-font')
        .should('exist')
        .invoke('text')
        .then((text) => {
          cy.log('Extracted middle square text:', text);
        });
  
      cy.get('.banner-square-overlay-button')
        .should('exist')
        .invoke('text')
        .then((buttonText) => {
          cy.log('Extracted middle square button text:', buttonText);
        });
    });
  
    it('should check third square image', () => {
      cy.wait(['@createCart', '@getMenuImages']);
      
      cy.get('.banner-square:nth-child(3) .banner-square-image')
        .should('exist')
        .invoke('attr', 'src')
        .then((src) => {
          cy.log('Extracted third square image URL:', src);
        });
    });
  
    it('should load and check products on next tab', () => {
      cy.wait(['@createCart', '@getMenuImages']);
      
      cy.get('.tabContent .tab.inactive').eq(1).click(); // Switch to "Kategóriák" tab
      cy.wait(5000); // Adjust this wait time as needed
      
      cy.get('.product-item')
        .should('exist')
        .each((product) => {
          // Add assertions to check product information
          // For example: product.find('.product-title').should('exist');
        });
    });
  });
  