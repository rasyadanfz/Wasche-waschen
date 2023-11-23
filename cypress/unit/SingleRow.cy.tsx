import React from "react";
import SingleRow from "../../src/app/(pages)/(loggedIn)/laporan/components/SingleRow";

describe("<SingleRow />", () => {
    it("renders correctly", () => {
        cy.mount(<SingleRow nama="item" harga={500} jumlah={10} />);
        cy.get("div.grid").should("be.visible");
        cy.get("div.grid").should("have.class", "grid");
    });

    it("should contain the correct item value", () => {
        cy.mount(<SingleRow nama="item1" harga={2500} jumlah={14} />);
        const parentDiv = cy.get("div.grid");
        parentDiv.should("be.visible");
        parentDiv.find("div").should("have.length", 3);
        cy.get("div.grid")
            .find("div")
            .eq(0)
            .should("be.visible")
            .should("have.text", "item1");
        cy.get("div.grid")
            .find("div")
            .eq(1)
            .should("be.visible")
            .should("have.text", "2500");
        cy.get("div.grid")
            .find("div")
            .eq(2)
            .should("be.visible")
            .should("have.text", "14");
    });
});
