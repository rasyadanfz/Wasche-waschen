import type { ClothesCartData } from "@/app/api/keranjang/[id]/route";

describe('Create a new Transaction',()=>{

    let cntPakaian = 0;
    let arrPakaian:ClothesCartData[];

    beforeEach(()=>{
        cy.loginWithTestAccount("createNewTransaction@gmail.com","createNewTransaction")
    })
    
    it('it should add some clothes',()=>{
        cy.get('#pakaian_card') 
            .children('div')
            .each(($div)=>{
                cy.wrap($div)
                    .find('button')
                    .click();

                cy.wrap($div)
                    .find('#add_button')
                    .click();
                
                cntPakaian++;
            })     

        cy.get('#add_to_cart')
            .find('button')
            .click()

        cy.wait(3000)
    })

    it('it should create new transaction through cart page',()=>{
        cy.visit('/cart')
        cy.wait(3000)

        // traverse through each of clothes
        cy.get

        cy.get('#Create_Order')
            .click()
    })

    it('It should have the same item just like the one that was in the cart',()=>{
        cy.visit('/riwayat-transaksi')
        cy.wait(2000)
        cy.get('#list_transaksi')
            .children('div')
            .eq(0)
            .should('exist')

        cy.get('#list_transaksi')
            .children('div')
            .eq(0)
            .find('button')
            .click();
    
        cy.wait(5000)
    })

})




