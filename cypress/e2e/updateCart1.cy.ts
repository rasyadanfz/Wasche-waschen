describe("Update a cart", () => {
  beforeEach(() => {
    cy.loginWithTestAccount("test12345@gmail.com", "fuckyou");
  });

  it("Update Cart", () => {
    // nambah katalog
    const jumlahCatalog = 6;
    let i = 0;
    let kuantitas = 0;
    let limit = 1;

    while (i < jumlahCatalog) {
      while (kuantitas < limit) {
        if (kuantitas == 0) {
          cy.get("div#katalog_pakaian")
            .find("div#pakaianComponent")
            .eq(i)
            .find("button#tambah_button")
            .click();
          kuantitas++;
          limit++;
        } else {
          cy.get("div#katalog_pakaian")
            .find("div#pakaianComponent")
            .eq(i)
            .find("button#add_button")
            .click();
          kuantitas++;
        }
      }
      i++;
      kuantitas = 0;
    }

    cy.get("div#add_to_cart").find("button").click();

    let jumlahCart = 0;

    cy.wait(10000);
    cy.get("div#CartPage")
      .find("div#CartCard")
      .its("length")
      .then((length) => {
        jumlahCart += length;
        // substract hingga kuantitas menjadi 0 menggunakan button#substract_button

        for (let j = 0; j < jumlahCart; j++) {
          let kuantitas = 0;

          // ambil kuantitas dari CartCard
          cy.get("div#CartPage")
            .find("div#CartCard")
            .eq(j)
            .find("p#kuantitas")
            .then((el) => {
              kuantitas = parseInt(el.text());

              // substract hingga kuantitas menjadi 0 menggunakan button#substract_button
              for (let k = 0; k < kuantitas; k++) {
                cy.get("div#CartPage")
                  .find("div#CartCard")
                  .eq(j)
                  .find("button#substract_button")
                  .click();
              }
            });
        }
      });

    cy.get("div#CartPage").find("button#update_keranjang").click();

    cy.wait(5000);
    cy.get("div#CartPage").contains("Keranjang Kosong");
  });
});
