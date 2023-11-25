describe("Riwayat Transaksi", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("test12345@gmail.com", "fuckyou");
        cy.get("a[href='/riwayat-transaksi']").click();
        cy.wait(500);
    });

    it("should display riwayat transaksi", () => {
        cy.get("div#riwayat-transaksi").should("exist");
        cy.get("div#riwayat-transaksi")
            .should("be.visible")
            .and("have.length", 1)
            .and("contain", "Riwayat Transaksi");
    });

    it("should search transaksi", () => {
        cy.get("input[id=searchRiwayatTransaksi]").type("Transaksi 0{enter}");
        cy.get("div#riwayat-transaksi")
            .should("be.visible")
            .and("contain", "Transaksi 0");
    });

    it("should display tidak ada transaksi", () => {
        cy.get("input[id=searchRiwayatTransaksi]").type("Not Exist{enter}");
        cy.get("div#riwayat-transaksi")
            .should("be.visible")
            .and("contain", "Tidak ada transaksi");
    });

    it("should filter transaksi", () => {
        cy.get("div#filterBtn").click();
        cy.get("div#filterPopUp").should("be.visible");
        cy.get("div#filterPopUp").find("input[id=notConfirmed]").click();
        cy.get("div#filterPopUp")
            .find("input[id=startDate]")
            .type("2021-01-01");
        cy.get("div#filterPopUp").find("input[id=endDate]").type("2021-01-31");
        cy.get("div#filterPopUp").find("button[id=applyFilterBtn]").click();
        cy.wait(3000);
        cy.get("div#riwayat-transaksi")
            .should("be.visible")
            .and("contain", "Tidak ada transaksi");
    });

    it("pagination should work", () => {
        cy.get("div#riwayat-transaksi").should("be.visible");
        cy.get("div#riwayat-transaksi")
            .find("div#pagination")
            .should("be.visible");
        cy.get("div#riwayat-transaksi")
            .find("input[id=inputPage]")
            .should("be.visible")
            .type("100"); // 100 not exist
        cy.get("div#riwayat-transaksi").find("button#goToPageBtn").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Nomor halaman tidak ditemukan!");
    });

    it("should redirect to detail transaksi", () => {
        cy.get("div#riwayat-transaksi").should("be.visible");
        cy.get("div#riwayat-transaksi")
            .find("button[id=detailTransaksiBtn]")
            .should("be.visible")
            .first()
            .click();
        cy.wait(3000);
        cy.get("div#detail-transaksi").should("be.visible");
    });
});
