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

    it('it should add clothes to its keranjang first',()=>{
        cy.visit('/catalog')

        // add some clothes
        cy.get('*[class^="border flex flex-col justify-between my-5 items-center md:items-center gap-4 shadow-md transition-transform "]')
            .find('button')
            .each(($button)=>{
                cy.wrap($button).click();
                cntBeforeDelete++;
            });

        cy.get('*[class^="border flex flex-col justify-between my-5 items-center md:items-center gap-4 shadow-md transition-transform "]')
           .find('#add_button')
           .each(($button)=>{
                cy.wrap($button).click();
           });

        cy.get('*[class^="text-button px-4 py-2 rounded-md font-raleway bg-secondary-400 hover:bg-secondary-300 active:bg-secondary-300 shadow-lg w-[300px] h-[40px]"]')
            .click();

    })

    it('it should subtract all element by 1 and then delete one of the element',()=>{
        cy.visit('/cart');
        cy.wait(5000)

        cy.get('*[class^="flex flex-col md:flex-row justify-center items-between md:justify-between md:items-center gap-y-4"]')
            .each(($div,index)=>{
                // we want to del
                cy.wrap($div)
                    .find('button')
                    .click()

                if(index === 0){
                    // extra click to delete one of them
                    cy.wrap($div)
                        .find('button')
                        .click();

                    cy.wrap($div)
                        .find('h1.text-h6.mb-2') // Adjust the selector based on your actual HTML structure
                        .invoke('text')
                        .then((text) => {
                        pakaianDeleted=text;
                    });

                }
            })
        
        cy.get('*[class^="flex flex-row justify-between md:justify-end md:gap-x-[50px]"]')
            .find('div')
            .each(($div,index)=>{
                if(index === 0){
                    // click the button
                    cy.wrap($div)
                        .find('button')
                        .click();
                }
            })

        cy.get('*[class^="flex flex-col md:flex-row justify-center items-between md:justify-between md:items-center gap-y-4"]')
            .each(($div,index)=>{
                // we want to del
                cy.wrap($div)
                    .find('div.flex.flex-row.gap-5')
                    .find('div')
                    .eq(2)
                    .find('p')
                    .eq(0)
                    .invoke('text')
                    .then((text)=>{
                        const number = parseInt(text);
                        expect(number).to.equal(1);
                    });
                
                cy.wrap($div)
                    .find('h1.text-h6.mb-2') // Adjust the selector based on your actual HTML structure
                    .invoke('text')
                    .then((text) => {
                    expect(text).not.to.equal(pakaianDeleted);
                });



                cntAfterDelete++;
            }).then(()=>{
                expect(cntAfterDelete).to.equal(cntBeforeDelete-1);
            })

    })

    it('it should delete all of them',()=>{
        
    })


})


