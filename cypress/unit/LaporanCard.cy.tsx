import React from "react";
import LaporanCard from "../../src/app/(pages)/(loggedIn)/laporan/components/LaporanCard";

describe("<LaporanCard />", () => {
    it("renders", () => {
        cy.mount(<LaporanCard type="totalPendapatan" data={"Rp 50.000"} />);
        cy.get("#card").should("exist").should("be.visible");
    });

    it("renders totalPendapatan correctly", () => {
        cy.mount(<LaporanCard type="totalPendapatan" data={"50.000"} />);
        cy.get("#card").should("exist").should("be.visible");
        cy.get("#icon").should("exist").should("not.be.empty");
        cy.get("#cardtitle")
            .should("be.visible")
            .should("have.text", "Total Pendapatan");
        cy.get("#numdata")
            .should("be.visible")
            .should("have.text", "Rp 50.000");
        cy.get("#cardjenispakaian").should("be.empty");
    });

    it("renders jumlahTransaksi correctly", () => {
        cy.mount(<LaporanCard type="jumlahTransaksi" data={"55"} />);
        cy.get("#card").should("exist").should("be.visible");
        cy.get("#icon").should("exist").should("not.be.empty");
        cy.get("#cardtitle")
            .should("be.visible")
            .should("have.text", "Jumlah Transaksi");
        cy.get("#numdata").should("be.visible").should("have.text", "55");
        cy.get("#cardjenispakaian").should("be.empty");
    });

    it("renders jenisPakaian correctly", () => {
        cy.mount(<LaporanCard type="jenisPakaian" />);
        cy.get("#card").should("exist").should("be.visible");
        cy.get("#icon").should("exist").should("not.be.empty");
        cy.get("#cardtitle")
            .should("be.visible")
            .should("have.text", "Jumlah Jenis Pakaian");
        cy.get("#numdata").should("be.empty");
    });
});
