//Many failed tests because of this - configures Cypress to handle uncaught expectations
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('fb_api_track_info')) { //Prevents Cypress for failing tests if 'fb_api_track_info' is included
    return false;
  }
  //If error is not related to 'fb_api_track_info' Cypress handles it as usual
  return true;
});

describe('Butopea Website Tests', () => {
  beforeEach(() => {
    cy.visit('https://butopea.com');
  });

//--------------------------
  //test 1 - SUCCESFUL
  it('should check middle square content', () => {
    //Gets an element with the class 'banner-square-overlay-heading' and waits for a maximum of 10 seconds for it to exist
    cy.get('.banner-square-overlay-heading', { timeout: 10000 }).should('exist').invoke('text').then((text) => {
      cy.log('extracted middle square text:', text);
    });
  });
//----------------------------
//test 2 - SUCCESFUL
  it('should check if the right square contains an image', () => {
    cy.get('#home-content > div:nth-child(3) > div > div > div:nth-child(3) > div > a > div > div > img', { timeout: 10000 })
      .should('exist')
      .invoke('attr', 'src')
      .then((imageSrc) => {
        cy.log('Extracted right square image:', imageSrc);
      });
  });
//----------------------------
  //test 3 - UNSUCCESFUL
  it('should load and check products on next tab', () => {
    // Click on the desired element to load the next tab
    //cy.get("#new-arrivals > section > div > div > div:nth-child(4) > div > a > div.product-cover.bg-cl-secondary.product-cover-min-height > div.product-image.product-cover__thumb.original-thumbnail.product-image--height > img.preview-img-item.product-image__thumb").click();
      cy.get("#category > div.container.px0.pb30 > div > div > div > div:nth-child(1) > div > a > div.product-cover.bg-cl-secondary.product-cover-min-height > div.v-lazy-component.loaded > div > img.preview-img-item.product-image__thumb").click();

  //'#category > div.container.px0.pb30 > div > div > div > div:nth-child(1) > div > a'
    // Assuming .selector is the class that identifies the product items
    cy.get('.selector', { timeout: 10000 }).should('be.visible').each((product) => {
      const title = product.find('.product-title').text();
      const link = product.find('.product-link').attr('href');
      const imageSrc = product.find('.product-image img').attr('src');
      const price = product.find('.product-price').text();
  
      //Logged extract data
      cy.log('Product Title:', title);
      cy.log('Product Link:', link);
      cy.log('Product Image URL:', imageSrc);
      cy.log('Product Price:', price);
    });
  });
  
});
