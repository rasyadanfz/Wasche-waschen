describe("Detail Transaksi", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[id=email]").type("admin@gmail.com");
    cy.get("input[id=password]").type("admin123");
    cy.get("form").find("button[id=submit]").click();
    cy.wait(3000);
    cy.get("a[href='/transaksi']").click();
    cy.wait(3000);
    cy.get("div#transaksi")
      .find("button[id=detailTransaksiBtn]")
      .should("be.visible")
      .first()
      .click();
    cy.wait(3000);
  });

  it("should display detail transaksi", () => {
    cy.get("div#detail-transaksi").should("exist");
    cy.get("div#detail-transaksi")
      .should("be.visible")
      .and("have.length", 1)
      .and("contain", "Detail Transaksi");
  });

  it("should change status transaksi", () => {
    cy.get("div#detail-transaksi").should("be.visible");
    let initialStatus;
    cy.get("select#status")
      .invoke("val")
      .then((val) => {
        initialStatus = val;
      });
    const newStatus = initialStatus === "Done" ? "On Progress" : "Done";
    cy.get("select#status").select(newStatus);
    cy.get("select#status").should("have.value", newStatus);
    cy.get("button#saveBtn").click();
  });
});
