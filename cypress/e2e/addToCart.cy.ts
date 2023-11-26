import { Pakaian } from "@prisma/client";

describe('Add some clothes to cart',()=>{

    let pakaianFromDatabase:any;

    beforeEach(() => {
        cy.loginWithTestAccount("addToCart@gmail.com", "addToCart");
        cy.task('fetchPakaianFromDatabase').then((data)=>{
            pakaianFromDatabase=data;
        })
    });


    // add some clothes
    it('It should add some clothes',()=>{
        cy.get('*[class^="border flex flex-col justify-between my-5 items-start gap-4 shadow-md transition-transform "]')
            .find('button')
            .each(($button)=>{
                cy.wrap($button).click();
            });

        cy.get('*[class^="border flex flex-col justify-between my-5 items-start gap-4 shadow-md transition-transform "]')
           .find('#add_button')
           .each(($button)=>{
                cy.wrap($button).click();
           });

        cy.get('*[class^="text-button px-4 py-2 rounded-md font-raleway bg-secondary-400 hover:bg-secondary-300 active:bg-secondary-300 shadow-lg w-[300px] h-[40px]"]')
            .click();
    })


    it('The cart should have the same quantity and price',()=>{
        cy.visit('/cart')
        cy.wait(2000)

        cy.get('*[class^="flex flex-row justify-between items-center"]')
            .each(($div,index)=>{
                let pakaianName:string;
                let pakaianQuantity:number;
                let pakaianTotalHarga:number;
                cy.wrap($div)
                    .find('h1.text-h6.mb-2') // Adjust the selector based on your actual HTML structure
                    .invoke('text')
                    .then((text) => {
                    pakaianName = text;
                });

                
                cy.wrap($div)
                    .find('div.flex.flex-row.gap-5')
                    .find('div')
                    .eq(2)
                    .find('p')
                    .eq(0)
                    .invoke('text')
                    .then((text)=>{
                        const number = parseInt(text);
                        expect(number).to.be.a('number');
                        pakaianQuantity = number;
                    })
                
                cy.wrap($div)
                    .find('div.flex.flex-row.gap-5')
                    .find('div')
                    .eq(2)
                    .find('p')
                    .eq(1)
                    .invoke('text')
                    .then((text)=>{
                        const number = parseInt(text);
                        expect(number).to.be.a('number');
                        pakaianTotalHarga = number;
                    })
                    
                    
                cy.then(()=>{
                    cy.log(`Pakaian ${pakaianName} has the quantity of ${pakaianQuantity} with total harga of ${pakaianTotalHarga}`)

                    for(let i = 0;i < pakaianFromDatabase.length;i++){
                        if(pakaianName === pakaianFromDatabase[i].name){
                            // same
                            expect(pakaianTotalHarga).to.equal(pakaianFromDatabase[i].price*pakaianQuantity)
                        }
                    }

                })

            })

        
        
    })


})