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
                
                cntPakaian++;
            })     

        cy.get('#add_to_cart')
            .find('button')
            .click()

        cy.wait(3000)
    })

    it('The cart should have the same quantity and price',()=>{
        cy.visit('/cart')
        cy.wait(5000)

        cy.get('#keranjang_card')
            .children('div')
            .each(($div)=>{
                let pakaianName:string;
                let pakaianQuantity:number;
                let pakaianTotalHarga:number;

                cy.wrap($div)
                    .find('div > div > h1')
                    .invoke('text')
                    .then((text)=>{
                        pakaianName = text;
                    })

                cy.wrap($div)
                    .find('div > div > div')
                    .children('div')
                    .eq(2)
                    .children('p')
                    .each(($p,index)=>{
                    
                        cy.wrap($p)
                            .invoke('text')
                            .then((text)=>{
                                if(index === 0){
                                    const num = parseInt(text);
                                    expect(num).to.be.a('number');
                                    pakaianQuantity = num;
                                }else{
                                    const num = parseInt(text);
                                    expect(num).to.be.a('number');
                                    pakaianTotalHarga = num;
                                }
                            })

                    })

                cy.then(()=>{
                    for(let i = 0;i < pakaianFromDatabase.length;i++){
                        if(pakaianFromDatabase[i].name === pakaianName){
                            // same
                            expect(pakaianTotalHarga).to.equal(pakaianFromDatabase[i].price*pakaianQuantity);
                        }
                    }
                })
                
                cntPakaianCart++;
            }).then(()=>{
                expect(cntPakaian).to.equal(cntPakaianCart)
            })

    })

})