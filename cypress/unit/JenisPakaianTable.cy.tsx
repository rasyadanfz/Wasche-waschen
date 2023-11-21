import React from "react";
import JenisPakaianTable, {
    ReportClothesData,
} from "../../src/app/(pages)/(loggedIn)/laporan/components/JenisPakaianTable";

describe("<JenisPakaianTable />", () => {
    const emptyClothesData: ReportClothesData[] = [];
    const clothesData: ReportClothesData[] = [
        { name: "Kemeja", price: 3000, quantity: 5 },
        { name: "Celana", price: 2000, quantity: 10 },
    ];

    it("renders", () => {
        cy.mount(<JenisPakaianTable clothesData={clothesData} />);
        cy.get("div").should("be.visible");
    });

    it("should display empty table", () => {
        cy.mount(<JenisPakaianTable clothesData={emptyClothesData} />);
        cy.get("#nodata")
            .should("be.visible")
            .should("not.empty")
            .should("have.text", "No Data for Today");
        cy.get("div.grid").eq(1).should("not.exist");
    });

    it("should display table with data", () => {
        cy.mount(<JenisPakaianTable clothesData={clothesData} />);
        cy.get("#nodata").should("not.exist");
        cy.get("div.grid").eq(1).should("be.visible");
        cy.get("div.grid").eq(1).find("div").should("have.length", 3);
        cy.get("div.grid")
            .eq(1)
            .find("div")
            .eq(0)
            .should("be.visible")
            .should("have.text", "Kemeja");
        cy.get("div.grid")
            .eq(1)
            .find("div")
            .eq(1)
            .should("be.visible")
            .should("have.text", "3000");
        cy.get("div.grid")
            .eq(1)
            .find("div")
            .eq(2)
            .should("be.visible")
            .should("have.text", "5");
        cy.get("div.grid").eq(2).should("be.visible");
        cy.get("div.grid")
            .eq(2)
            .find("div")
            .eq(0)
            .should("be.visible")
            .should("have.text", "Celana");
        cy.get("div.grid")
            .eq(2)
            .find("div")
            .eq(1)
            .should("be.visible")
            .should("have.text", "2000");
        cy.get("div.grid")
            .eq(2)
            .find("div")
            .eq(2)
            .should("be.visible")
            .should("have.text", "10");
    });
});
