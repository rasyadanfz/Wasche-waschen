import React from "react";
import PeriodSelector from "../../src/app/(pages)/(loggedIn)/laporan/components/PeriodSelector";

describe("<PeriodSelector />", () => {
    it("renders correctly", () => {
        cy.mount(<PeriodSelector onChange={() => {}} />);
        cy.get("div>div").should("be.visible");
        cy.get("div#arrow").should("be.visible");
    });

    it("correctly show initial state", () => {
        cy.mount(<PeriodSelector onChange={() => {}} />);
        cy.get("div>div").should("be.visible");
        cy.get("div#arrow").should("be.visible");
        cy.get("#choice").should("be.visible").should("have.text", "Harian");
        cy.get(".absolute").should("not.exist");
    });

    it("should show/close dropdown when clicked", () => {
        cy.mount(<PeriodSelector onChange={() => {}} />);
        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get(".relative").click();
        cy.get(".absolute").should("not.exist");
    });

    it("should change choice when clicked", () => {
        cy.mount(<PeriodSelector onChange={() => {}} />);
        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#harian")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Harian");
            });
        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#mingguan")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Mingguan");
            });
        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#bulanan")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Bulanan");
            });
        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#harian")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Harian");
            });
    });

    it("should call onChange properly", () => {
        const functionOwner = {
            onChange: (str: string) => {},
        };

        const onChange = cy.stub(functionOwner, "onChange");
        cy.mount(<PeriodSelector onChange={onChange} />);
        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#harian")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Harian");
                expect(onChange).to.be.calledWith("harian");
            });

        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#mingguan")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Mingguan");
                expect(onChange).to.be.calledWith("mingguan");
            });

        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#bulanan")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Bulanan");
                expect(onChange).to.be.calledWith("bulanan");
            });

        cy.get(".relative").click();
        cy.get(".absolute").should("exist").should("be.visible");
        cy.get("#harian")
            .click()
            .then(() => {
                cy.get(".absolute").should("not.exist");
                cy.get("#choice").should("have.text", "Harian");
            });
    });
});
