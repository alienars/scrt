const homeDir = "http://localhost/sec/dist/";

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const randomString = generateRandomString(200);
const randomPass = generateRandomString(15);

describe('Full Test', () => {

  it('Result"', () => {
    
    cy.visit(homeDir)
    cy.get('#text').type(randomString).should('have.value', randomString)
    cy.get('#pass_btn').click()
    cy.get('#key').type(randomPass).should('have.value', randomPass)
    cy.get('#key').should('be.visible')
    cy.get('#urll_btn').click()
    cy.contains('16').click()
    cy.get('#submit_btn').click().wait(2000).then(()=>{
      cy.get('#url_input').should('be.visible')
    })

    cy.get('#url_input').invoke('val').then((inputValue) => {
      const modifiedUrl = `${inputValue}`;
      cy.visit(modifiedUrl)
    });

    cy.get('#pass_input').should('be.visible')
    cy.get('#pass_input').type(randomPass).should('have.value', randomPass)
    cy.get('#get_secret').click().wait(2000).then(()=>{
      cy.get('#secret_input').should('have.value', randomString)
    })

    cy.get('#delete_text').click()
    cy.visit(homeDir)
    
  })

})

