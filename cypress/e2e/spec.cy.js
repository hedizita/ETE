//many failed tests because of this - configures Cypress to handle uncaught expectations
//INNENTŐL JÓ
Cypress.on('uncaught:exception', (err, runnable) => {
  //prevents Cypress for failing tests if 'fb_api_track_info' is included
  if (err.message.includes('fb_api_track_info')) {
    return false;
  }
  //if error is not related to 'fb_api_track_info' Cypress handles it as usual
  return true;
});

describe('Butopea Website Tests', () => {
  beforeEach(() => {
    cy.visit('https://butopea.com');
  });
  //test 1
  it('should check middle square content', () => {
    //gets an element with the class 'banner-square-overlay-heading' and wait for a maximum of 10 seconds for it to exist
    cy.get('.banner-square-overlay-heading', { timeout: 10000 }).should('exist').invoke('text').then((text) => {
      cy.log('extracted middle square text:', text);
    });
  });
//IDÁIG JÓ

//test 2
  it('should check if the right square contains an image', () =>{
    cy.get('.nth-child(3)', {timeout: 10000}).should('exist').invoke('image').then((Image) => {
      cy.log('extracted right square image:', Image);
    });
  });

  //test 3
  it('should load and check products on next tab', () => {
    cy.get('.tab.active').click();


    cy.get('.selector', { timeout: 10000 }).should('be.visible').each((product) => {
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
