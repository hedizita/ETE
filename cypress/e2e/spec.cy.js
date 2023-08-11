//many failed tests because of these issues
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('fb_api_track_info')) {
    return false;
  }
  return true;
});

describe('Butopea Website Tests', () => {
  beforeEach(() => {
    cy.visit('https://butopea.com');
  });

  it('should check middle square content', () => {
    cy.get('.banner-square-overlay-heading').should('exist').invoke('text').then((text) => {
      cy.log('Extracted middle square text:', text);
    });

    cy.get('.banner-square-overlay-button').should('exist').invoke('text').then((buttonText) => {
      cy.log('Extracted middle square button text:', buttonText);
    });
  });

  it('should check third square image', () => {
    cy.get('.banner-square:nth-child(3) .banner-square-image').should('exist').invoke('attr', 'src').then((src) => {
      cy.log('Extracted third square image URL:', src);
    });
  });

  it('should load and check products on next tab', () => {
    cy.get('.tabContent .tab.inactive').eq(1).click(); //kategórák tab
    cy.wait(5000);

    cy.get('.product-item').should('exist').each((product) => {
      const title = product.find('.product-title').text();
      const link = product.find('.product-link').attr('href');
      const imageSrc = product.find('.product-image img').attr('src');
      const price = product.find('.product-price').text();

      cy.log('Product Title:', title);
      cy.log('Product Link:', link);
      cy.log('Product Image URL:', imageSrc);
      cy.log('Product Price:', price);
    });
  });
});
