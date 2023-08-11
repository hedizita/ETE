//many failed tests because of this
//INNENTŐL NEM VÁLTOZTASSAD A KÓDOD
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
    cy.get('.banner-square-overlay-heading', { timeout: 10000 }).should('exist').invoke('text').then((text) => {
      cy.log('Extracted middle square text:', text);
    });
  });

  it('should load and check products on next tab', () => {
    cy.get('.tab.active').click();
//IDÁIG NE VÁLTOZTASSAD A KÓDOD

    cy.get('.product-item', { timeout: 20000 }).should('be.visible').each((product) => {
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
