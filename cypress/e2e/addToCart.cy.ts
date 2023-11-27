import { Pakaian } from "@prisma/client";

describe('Add some clothes to cart',()=>{

    let pakaianFromDatabase:any;
    let cntPakaian = 0;
    let cntPakaianCart = 0;

    beforeEach(() => {
        cy.loginWithTestAccount("addToCart1@gmail.com", "addToCart1@gmail.com");
        cy.task('fetchPakaianFromDatabase').then((data)=>{
            pakaianFromDatabase=data;
        })
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
            })     

        cy.get('#add_to_cart')
            .find('button')
            .click()

        cy.wait(3000)
    })


    // it('The cart should have the same quantity and price',()=>{
    //     cy.visit('/cart')
    //     cy.wait(5000)

    //     cy.get('*[class^="flex flex-row justify-between items-center"]')
    //         .each(($div,index)=>{
    //             let pakaianName:string;
    //             let pakaianQuantity:number;
    //             let pakaianTotalHarga:number;

    //             cy.wrap($div)
    //                 .find('h1.text-h6.mb-2') // Adjust the selector based on your actual HTML structure
    //                 .invoke('text')
    //                 .then((text) => {
    //                 pakaianName = text;
    //             });

                
    //             cy.wrap($div)
    //                 .find('div.flex.flex-row.gap-5')
    //                 .find('div')
    //                 .eq(2)
    //                 .find('p')
    //                 .eq(0)
    //                 .invoke('text')
    //                 .then((text)=>{
    //                     const number = parseInt(text);
    //                     expect(number).to.be.a('number');
    //                     pakaianQuantity = number;
    //                 });
                
    //             cy.wrap($div)
    //                 .find('div.flex.flex-row.gap-5')
    //                 .find('div')
    //                 .eq(2)
    //                 .find('p')
    //                 .eq(1)
    //                 .invoke('text')
    //                 .then((text)=>{
    //                     const number = parseInt(text);
    //                     expect(number).to.be.a('number');
    //                     pakaianTotalHarga = number;
    //                 });

                
    //             cntPakaianCart++;

                    
    //             cy.then(()=>{
    //                 cy.log(`Pakaian ${pakaianName} has the quantity of ${pakaianQuantity} with total harga of ${pakaianTotalHarga}`)

    //                 for(let i = 0;i < pakaianFromDatabase.length;i++){
    //                     if(pakaianName === pakaianFromDatabase[i].name){
    //                         // same
    //                     expect(pakaianTotalHarga).to.equal(pakaianFromDatabase[i].price*pakaianQuantity)
    //                     }
    //                 }

    //             });

    //         }).then(()=>{
    //             expect(cntPakaian).to.equal(cntPakaianCart)
    //         })
    // })


})