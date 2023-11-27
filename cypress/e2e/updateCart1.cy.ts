function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}


describe('Update a cart',()=>{


    let cntBeforeDelete:number = 0;
    let cntAfterDelete:number = 0;
    let pakaianDeleted:string;
    let gmail:string;
    let password:string;

    before(()=>{
        // make a gmail
        gmail = generateRandomString(10) + "@gmail.com";
        password = generateRandomString(10);

        // register it 
        cy.visit('/register')
        cy.get('*[class^="flex flex-col gap-y-1 font-raleway"]')
            .each(($div,index)=>{
                
                if(index === 1){
                    // simulate typing gmail
                    cy.wrap($div)
                        .find('input')
                        .type(`${gmail}`);
                }else{
                    cy.wrap($div)
                        .find('input')
                        .type(`${password}`);
                }
            })

            cy.get('#submit')
                .click()
            cy.wait(5000)

    })

    beforeEach(() => {
        cy.loginWithTestAccount(`${gmail}`, `${password}`);
    });


    it('It should add some clothes',()=>{
        cy.get('#pakaian_card') 
            .children('div')
            .each(($div)=>{
                cy.wrap($div)
                    .find('button')
                    .click();

                cy.wrap($div)
                    .find('#add_button')
                    .click();
                
                cntBeforeDelete++;
            })     

        cy.get('#add_to_cart')
            .find('button')
            .click()

        cy.wait(3000)
    })

    it('it should subtract all element by 1 and then delete one of the pakaian',()=>{
        cy.visit('/cart')
        // delete
        cy.get('#keranjang_card')
            .children('div')
            .each(($div,index)=>{

                cy.wrap($div)
                    .find('button')
                    .click()
                    .click()
                    .click()
                    .click()
                    

            })


        cy.get('#update_keranjang')
            .click()

        cy.wait(10000)

        // checking

        // cy.get('#keranjang_card')
        //     .children('div')
        //     .each(($div)=>{
        //         cntAfterDelete++;
        //         cy.wrap($div)
        //             .find('div > div > h1')
        //             .invoke('text')
        //             .then((text)=>{
        //                 expect(text).not.equal(pakaianDeleted);
        //             })
        //         cy.wrap($div)
        //             .children('div')
        //             .eq(2)
        //             .children('p')
        //             .eq(0)
        //             .should('equal','1')
        //     })

        
        

        
    })

})


