import React from "react";
import TableHeader from "../../src/app/(pages)/(loggedIn)/laporan/components/TableHeader";

describe("<TableHeader />", () => {
    it("renders", () => {
        cy.mount(<TableHeader />);
        cy.get("div").should("be.visible");
    });

    it("should display the correct header", () => {
        cy.mount(<TableHeader />);
        cy.get("div.grid").find("div").should("have.length", 3);
        cy.get("div.grid")
            .find("div")
            .eq(0)
            .should("be.visible")
            .should("have.text", "Nama");
        cy.get("div.grid")
            .find("div")
            .eq(1)
            .should("be.visible")
            .should("have.text", "Harga");
        cy.get("div.grid")
            .find("div")
            .eq(2)
            .should("be.visible")
            .should("have.text", "Jumlah");
    });
});
