describe("Update a cart", () => {
    beforeEach(() => {
      cy.loginWithTestAccount("test12345@gmail.com", "fuckyou");
    });
  
    it("Update Cart", () => {
      // nambah katalog
      const jumlahCatalog = 6;
      let i = 0;
      let kuantitas = 0;
      let limit = 2;
  
     cy.get('#pakaian_card') 
            .children('div')
            .each(($div)=>{
                for(let i = 0;i < limit;i++){
                    if(i === 0){
                        cy.wrap($div)
                        .find('#tambah_button')
                        .click();
                    }else{
                        cy.wrap($div)
                        .find('#add_button')
                        .click();
                    }

                }
                
            })     
        
        cy.wait(1500)

        cy.get('#add_to_cart')
            .find('button')
            .click()

        cy.wait(3000)
  
      let jumlahCart = 0;   
      cy.visit('/cart')

      cy.get("div#keranjang_card")
            .children('div')
            .each(($div)=>{
                    cy.wrap($div)
                        .find('div > div > div')
                        .eq(3)
                        .find('p')
                        .eq(0)
                        .invoke('text')
                        .then((text)=>{
                            kuantitas = parseInt(text);
                            cy.log(`${text}`)
                            kuantitas+=2
                            while(kuantitas>0){
                                kuantitas--;
                                cy.wrap($div)
                                .find('button')
                                .click()
                                .wait(1000);
                            }
                            // for(let i = 0;i < kuantitas;i++){
                            //     cy.wrap($div)
                            //         .find('button')
                            //         .click();
                            // }
                        })
            })
  
    //   cy.get("div#keranjang_cart")
    //     .find("div#keranjang_card")
    //     .its("length")
    //     .then((length) => {
    //       jumlahCart += length;
    //       // substract hingga kuantitas menjadi 0 menggunakan button#substract_button
    //       for (let j = 0; j < jumlahCart; j++) {
    //         let kuantitas = 0;
  
    //         // ambil kuantitas dari CartCard
    //         cy.get("div#keranjang_card")
    //           .eq(j)
    //           .find('p#kuantitas')
    //           .invoke('text')
    //           .then((text) => {
    //             kuantitas = parseInt(text);
    //             cy.log(`Kuantitas ${kuantitas}`)
    //             // substract hingga kuantitas menjadi 0 menggunakan button#substract_button
    //             for (let k = 0; k < kuantitas; k++) {
    //               cy.get("div#keranjang_cart")
    //                 .find("div#keranjang_card")
    //                 .eq(j)
    //                 .find("button#substract_button")
    //                 .click();
    //             }
    //           });
    //       }
    //     });
  
      cy.get("div#keranjang_cart").find("button#update_keranjang").click();
  
      cy.wait(5000);
      cy.get("div#keranjang_cart").contains("Keranjang Kosong");
    });
  });
  
  