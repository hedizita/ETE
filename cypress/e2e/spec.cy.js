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
  it('should check if the right square contains an image', () => {
    cy.get('#home-content > div:nth-child(3) > div > div > div:nth-child(3) > div > a > div > div > img', { timeout: 10000 })
      .should('exist')
      .invoke('attr', 'src')
      .then((imageSrc) => {
        cy.log('Extracted right square image:', imageSrc);
      });
  });

//document.querySelector("#home-content > div:nth-child(3) > div > div > div:nth-child(3) > div > a > div > div > img")

  //test 3
  /*it('should load and check products on next tab', () => {
    cy.get('document.querySelector("#category > div.container.px0.pb30 > div > div > div > div:nth-child(1) > div > a > div.product-cover.bg-cl-secondary.product-cover-min-height > div.v-lazy-component.loaded > div > img.preview-img-item.product-image__thumb")').click();


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
  });*/

  it('should load and check products on next tab', () => {
    // Click on the desired element to load the next tab
    cy.get('#category > div.container.px0.pb30 > div > div > div > div:nth-child(1) > div > a').click();
  
    // Assuming .selector is the class that identifies the product items
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
