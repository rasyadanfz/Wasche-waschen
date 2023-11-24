describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[id=email]").type("testingaccount@gmail.com");
    cy.get("input[id=password]").type("testaccount13579");
    cy.get("form").find("button[id=submit]").click();
    cy.wait(3000); // Consider replacing this with a more robust mechanism
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
