import "../fixtures/elements.json"
// Cypress.Commands.add("Login", function() {
//     cy.get(this.elements.login.input_taxvat).type('18713445000184')
//     cy.get(this.elements.login.input_pass).type('Nestle@preprod123')
//     cy.get(this.elements.login.button_login).click()
// });


Cypress.Commands.add('login', function () {
  cy.request({
    method: 'POST',
    url: 'https://preprod.boservices.nestleatevoce.com.br/graphql',
    body: {
      operationName: 'generateCustomerToken',
      query: `
        mutation {
            generateCustomerToken(
              taxvat: "18713445000184"
              password: "Nestle@preprod123"
            ) {
              token
            }
          }
        `,
    },
  })
    .then((resp) => {
      const token_login = resp.body.data.generateCustomerToken.token
      var data = new Date().getTime();
      window.localStorage.setItem('M2_VENIA_BROWSER_PERSISTENCE__signin_token', `{"value":"\\"${token_login}\\"","timeStored":${data},"ttl":"1200"}`)

      cy.request({
        method: 'POST',
        url: 'https://preprod.boservices.nestleatevoce.com.br/graphql',
        headers: {
          authorization: `bearer ${token_login}`
        },
        body: {
          operationName: 'createEmptyCart',
          query: `
          mutation {
            createEmptyCart
          }
          `,
        },
      })
        .then((resp) => {
          const token_cart = resp.body.data.createEmptyCart

          window.localStorage.setItem('M2_VENIA_BROWSER_PERSISTENCE__cartId', `{"value":"\\"${token_cart}\\"","timeStored":${data}}`)

          cy.request({
            method: 'POST',
            url: 'https://preprod.boservices.nestleatevoce.com.br/graphql',
            headers: {
              authorization: `bearer ${token_login}`
            },
            body: {
              operationName: 'clearCart',
              query: `
              mutation clearCart {
                clearCart(input: { cart_id: "${token_cart}" }) {
                  cart {
                    id
                  }
                }
              }
              `,
            },
          })
        })
    })
})


