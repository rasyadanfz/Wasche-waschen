import type { ClothesCartData } from "@/app/api/keranjang/[id]/route";
import { equal } from "assert";

describe('Create a new Transaction',()=>{

    let cntPakaian = 0;
    let arrPakaian:ClothesCartData[] = [];

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
        
        cy.wait(1500)

        cy.get('#add_to_cart')
            .find('button')
            .click()

        cy.wait(3000)
    })

    it('it should create new transaction through cart page',()=>{
        cy.visit('/cart')
        cy.wait(3000)

        // traverse through each of clothes
        cy.get('#keranjang_card')
            .children('div')
            .each(($div)=>{

                let tempElement:ClothesCartData = {
                    pakaianNama:"ASD",
                    kuantitas:123,
                    total_harga:123
                }
                
                cy.wrap($div)
                    .find('h1')
                    .invoke('text')
                    .then((text)=>{
                        tempElement.pakaianNama = text;
                        cy.wrap($div)
                        .find('div > div')
                        .eq(0)
                        .find('div > div')
                        .eq(2)
                        .children('p')
                        .each(($p,index)=>{
                            if(index === 0){
                                cy.wrap($p)
                                    .invoke('text')
                                    .then((text)=>{
                                        const num = parseInt(text)
                                        cy.log(`${num}`)
                                        tempElement.kuantitas = num
                                    })
                            }else{
                                cy.wrap($p)
                                .invoke('text')
                                .then((text)=>{
                                    const num = parseInt(text)
                                    cy.log(`${num}`)
                                    tempElement.total_harga = num
                                })
                            }
                        }).then(()=>{
                            cy.log(`${tempElement.kuantitas} ${tempElement.pakaianNama} ${tempElement.total_harga}`)
                            arrPakaian.push(tempElement);
                        })
                    })
            })

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

        cy.wait(2000)

        let cntIdx:number = 0;
        
        cy.get('table')
            .find('tbody')
            .eq(1)
            .children('tr')
            .each(($tr)=>{
                cy.log(`${arrPakaian[cntIdx].kuantitas} ${arrPakaian[cntIdx].pakaianNama} ${arrPakaian[cntIdx].total_harga}`)
                const temp = arrPakaian[cntIdx];
                cy.wrap($tr)
                    .children('td')
                    .each(($td,index)=>{
                        if(index === 1){
                            // compare with name
                            cy.wrap($td)
                                .invoke('text')
                                .then((text)=>{
                                    expect(text).to.equal(temp.pakaianNama);
                                })
                    
                        }else if(index === 3){
                            cy.wrap($td)
                                .invoke('text')
                                .then((text)=>{
                                    const num = parseInt(text);
                                    expect(num).to.equal(temp.kuantitas);
                                })
                        }else if(index === 4){
                            cy.wrap($td)
                            .invoke('text')
                            .then((text)=>{
                                const temptext = text.slice(4);
                                const num = parseInt(temptext.replace(/,/g,'')); 
                                expect(num).to.equal(temp.total_harga)
                            })
                        }
                      
                    })
                    cntIdx++;
            }).then(()=>{
                expect(cntIdx).to.equal(arrPakaian.length)
            })


    })

})




