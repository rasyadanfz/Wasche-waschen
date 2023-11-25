describe("Riwayat Transaksi", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("admin2W@gmail.com", "waschewaschenadmin");
        cy.get("a[href='/transaksi']").click();
        cy.wait(3000);
    });

    it("should display daftar transaksi", () => {
        cy.get("div#transaksi").should("exist");
        cy.get("div#transaksi")
            .should("be.visible")
            .and("have.length", 1)
            .and("contain", "Daftar Transaksi");
    });

    it("should search transaksi", () => {
        cy.get("input[id=searchTransaksi]").type("Transaksi 0{enter}");
        cy.get("div#transaksi")
            .should("be.visible")
            .and("contain", "Transaksi 0");
    });

    it("should display tidak ada transaksi", () => {
        cy.get("input[id=searchTransaksi]").type("Not Exist{enter}");
        cy.get("div#transaksi")
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
        cy.get("div#transaksi")
            .should("be.visible")
            .and("contain", "Tidak ada transaksi");
    });

    it("pagination should work", () => {
        cy.get("div#transaksi").should("be.visible");
        cy.get("div#transaksi").find("div#pagination").should("be.visible");
        cy.get("div#transaksi")
            .find("input[id=inputPage]")
            .should("be.visible")
            .type("100"); // 100 not exist
        cy.get("div#transaksi").find("button#goToPageBtn").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Nomor halaman tidak ditemukan!");
    });

    it("should redirect to detail transaksi", () => {
        cy.get("div#transaksi").should("be.visible");
        cy.get("div#transaksi")
            .find("button[id=detailTransaksiBtn]")
            .should("be.visible")
            .first()
            .click();
        cy.wait(1500);
        cy.get("div#detail-transaksi").should("be.visible");
    });
});
