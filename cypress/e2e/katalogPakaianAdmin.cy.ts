describe("Katalog Pakaian Admin", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("admin@gmail.com", "admin123");
        cy.visit("/catalog");
        cy.wait(500);
    })

    it("should display katalog", () => {
        cy.get("#katalog_pakaian")
            .should("exist")
            .should("be.visible")
            .contains("Pakaian");
    })

    it("should display search bar", () => {
        cy.get("#search_bar").should("exist").should("be.visible");
    })

    it("should display filter dropdown", () => {
        cy.get("#filter_dropdown").should("exist").should("be.visible");
    })

    it("should display pakaian card", () => {
        cy.get("#pakaian_card").should("exist").should("be.visible");
    })

    it("should search pakaian", () => {
        cy.get("#search_bar").type("kemeja");
        cy.get("#pakaian_card").should("be.visible").contains("Kemeja");
        cy.get("#pakaian_card").should("be.visible").contains("Celana jeans");
    })

    it("should filter pakaian", () => {
        cy.get("#filter_dropdown").click();
        cy.get("#harga1").click();
        cy.get("#apply").click();
        cy.get("#pakaian_card").should("be.visible").contains("Kemeja");
    })

    it("should display edit button", () => {
        cy.get("#pakaian_card")
            .should("be.visible")
            .contains("Kemeja")
            .parent()
            .parent()
        cy.get("#edit_button").should("exist").should("be.visible");
    })

    it("should display delete button", () => {
        cy.get("#pakaian_card")
            .should("be.visible")
            .contains("Kemeja")
            .parent()
            .parent()
        cy.get("#delete_button").should("exist").should("be.visible");
    })

    it("should display create button", () => {
        cy.get("#create_button").should("exist").should("be.visible");
    })

    it("should create pakaian", () => {
        cy.get("#create_button").click();
        cy.get("input[id=name]").type("Test pakaian");
        cy.get("input[id=price]").type("2000");
        cy.get("input[id=unit]").type("satuan");
        cy.get("button[id=submit]").click();
        cy.wait(500);
        cy.get("#katalog_pakaian")
            .should("be.visible")
            .contains("Test pakaian")
    })

    it("should edit pakaian", () => {
        cy.get("#pakaian_card")
            .should("be.visible")
            .contains("Kemeja")
            .parent()
            .parent()
        cy.get("#edit_button").click();
        cy.get("input[id=price]").type("1000");
        cy.get("button[id=submit]").click();
        cy.wait(1000);
        cy.get("#katalog_pakaian")
            .should("be.visible")
            .contains("Kemeja")
            .parent()
            .contains("1000")
    })

    it("should delete pakaian", () => {
        cy.get("#pakaian_card")
            .should("be.visible")
            .contains("Test pakaian")
            .parent()
            .parent()
        cy.get("#delete_button").click();
        cy.get("#delete").click();
        cy.wait(1000);
        cy.get("#katalog_pakaian")
            .should("not.contain", "Test pakaian")
    })
})