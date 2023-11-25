describe("Katalog Pakaian", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("fren@gmail.com", "fren");
        cy.visit("/catalog");
        cy.wait(500);
    });

    it("should display katalog", () => {
        cy.get("#katalog_pakaian")
            .should("exist")
            .should("be.visible")
            .contains("Pakaian");
    });

    it("should display search bar", () => {
        cy.get("#search_bar").should("exist").should("be.visible");
    });

    it("should display filter dropdown", () => {
        cy.get("#filter_dropdown").should("exist").should("be.visible");
    });

    it("should display pakaian card", () => {
        cy.get("#pakaian_card").should("exist").should("be.visible");
    });

    it("should search pakaian", () => {
        cy.get("#search_bar").type("kemeja");
        cy.get("#pakaian_card").should("be.visible").contains("Kemeja");
        cy.get("#pakaian_card").should("be.visible").contains("Celana jeans");
    });

    it("should filter pakaian", () => {
        cy.get("#filter_dropdown").click();
        cy.get("#harga1").click();
        cy.get("#apply").click();
        cy.get("#pakaian_card").should("be.visible").contains("Kemeja");
    });

    it("should display add to cart button", () => {
        cy.get("#pakaian_card")
            .should("be.visible")
            .contains("Kemeja")
            .parent()
            .parent()
            .find("#tambah_button")
            .click()
        cy.get("#add_to_cart").should("exist").should("be.visible");
    })
})
