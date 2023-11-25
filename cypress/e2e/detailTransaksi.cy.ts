describe("Detail Transaksi", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("admin2W@gmail.com", "waschewaschenadmin");
        cy.wait(1000);
        cy.get("a[href='/transaksi']").click();
        cy.wait(1000);
        cy.get("div#transaksi")
            .find("button[id=detailTransaksiBtn]")
            .should("be.visible")
            .first()
            .click();
        cy.wait(2000);
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
        let newStatus = "";
        cy.get("select#status")
            .invoke("val")
            .then((val) => {
                initialStatus = val;
                newStatus = initialStatus === "Done" ? "On Progress" : "Done";
                cy.get("select#status").select(newStatus);
                cy.get("select#status").should("have.value", newStatus);
                cy.get("button#saveBtn").click();
            });
    });
});
