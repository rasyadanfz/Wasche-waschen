describe("Navbar", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("testingaccount@gmail.com", "testaccount13579");
        cy.wait(1000);
    });

    it("should redirect to profile page", () => {
        cy.get("a#profile[href='/profile']").click();
        cy.location("pathname").should("eq", "/profile");
    });

    it("should redirect to home", () => {
        cy.get("a[href='/catalog']").click();
        cy.location("pathname").should("eq", "/catalog");
    });

    it("should redirect to riwayat", () => {
        cy.get("a[href='/riwayat-transaksi']").click();
        cy.location("pathname").should("eq", "/riwayat-transaksi");
    });

    it("should redirect to cart", () => {
        cy.get("a[href='/cart']").click();
        cy.location("pathname").should("eq", "/cart");
    });
});
