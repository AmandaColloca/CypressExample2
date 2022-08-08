describe('Cart Test', function () {


    it('Add product to Minicart successfuly', function () {
        cy.login()
        cy.visit('/', {
            auth: {
                username: 'stareb2b',
                password: 'ff299qdmqY',
            }
        })
        cy.get(this.elements.home.indicated_products).click()
        cy.get(this.elements.product.about_product_passatempo).click()
        cy.get(this.elements.product_detail.dropdown_box).click()
        cy.get(this.elements.product_detail.dropdown_quantity_4).click()
        cy.contains('button', 'Adicionar ao Carrinho').first().click()
        cy.get(this.elements.header.logo).click()
        cy.get(this.elements.home.carousel_page_5).click()
        cy.get(this.elements.home.carousel_page_5_product_1_unit_measure_box).click()
        cy.get(this.elements.home.carousel_page_5_product_1_quantity).clear().type('10')
        cy.get(this.elements.home.carousel_page_5_product_1_add_to_cart).click()
        cy.get(this.elements.header.minicart).click()
        cy.get(this.elements.header.minicart_remove_item).first().click()
        cy.get(this.elements.header.minicart).click()
        cy.wait(2000)
        cy.get(this.elements.header.minicart_product_quantity).invoke('text').then(($value) => {
            expect($value).eq('10')
        })
    })

    it('Add product to Cart successfuly', function () {
        cy.login()
        cy.visit('/', {
            auth: {
                username: 'stareb2b',
                password: 'ff299qdmqY',
            }
        })
        cy.get(this.elements.home.carousel_page_6).click()
        cy.get(this.elements.home.carousel_page_6_product_2_quantity).clear().type('10')
        cy.get(this.elements.home.carousel_page_6_product_2_add_to_cart).click()
        cy.get(this.elements.header.search_bar).clear().type('Bebida de arroz {enter}')
        cy.get(this.elements.product.about_product_bebida_arroz).click()
        cy.get(this.elements.product_detail.dropdown_box).click()
        cy.get(this.elements.product_detail.dropdown_quantity_4).click()
        cy.contains('button', 'Adicionar ao Carrinho').first().click()
        cy.get(this.elements.header.minicart).click()
        cy.get(this.elements.header.minicart_to_cart).click()
        cy.get(this.elements.cart.remove_from_cart).first().click()
        cy.get(this.elements.cart.clear_cart).click()
        cy.contains('button', 'Sim').click()
        cy.wait(2000)
        cy.get(this.elements.header.minicart_product_quantity).invoke('text').then(($value) => {
            expect($value).eq('0')
        })

    })

})