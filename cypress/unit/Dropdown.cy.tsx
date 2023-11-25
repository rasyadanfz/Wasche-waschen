import Dropdown from "@/app/(pages)/(loggedIn)/catalog/components/Dropdown";

describe ("<Dropdown />", () => {
    it("renders correctly", () => {
        cy.mount(<Dropdown updateFilteredData={() => {}} updateDataToOriginal={() => {}} />);
        cy.get("#dropdown").should("be.visible");
    });

    it("should display the correct text", () => {
        cy.mount(<Dropdown updateFilteredData={() => {}} updateDataToOriginal={() => {}} />);
        cy.get("#dropdown").should("be.visible");
        cy.get("#dropdown").should("have.text", "Filter");
    })

    it("options should be visible when the dropdown is clicked", () => {
        cy.mount(<Dropdown updateFilteredData={() => {}} updateDataToOriginal={() => {}} />);
        cy.get("#dropdown").should("be.visible");
        cy.get("#dropdown").click();
        cy.get("#harga1").should("be.visible");
        cy.get("#harga1").should("be.visible");
        cy.get("#harga3").should("be.visible");
        cy.get("#harga4").should("be.visible");
    })

    it("apply and clear filters should be visible when the dropdown is clicked", () => {
        cy.mount(<Dropdown updateFilteredData={() => {}} updateDataToOriginal={() => {}} />);
        cy.get("#dropdown").should("be.visible");
        cy.get("#dropdown").click();
        cy.get("#apply").should("be.visible");
        cy.get("#clear").should("be.visible");
    })

    it("options, apply filter, and clear filter should invisible when the dropdown is clicked twice", () => {
        cy.mount(<Dropdown updateFilteredData={() => {}} updateDataToOriginal={() => {}} />);
        cy.get("#dropdown").should("be.visible");
        cy.get("#dropdown").click();
        cy.get("#dropdown").click();
        cy.get("#harga1").should("not.exist");
        cy.get("#harga3").should("not.exist");
        cy.get("#harga4").should("not.exist");
        cy.get("#apply").should("not.exist");
        cy.get("#clear").should("not.exist");
    })

    it("options should be checked when the options are clicked", () => {
        cy.mount(<Dropdown updateFilteredData={() => {}} updateDataToOriginal={() => {}} />);
        cy.get("#dropdown").should("be.visible");
        cy.get("#dropdown").click();
        cy.get("#harga1").click();
        cy.get("#harga2").click();
        cy.get("#harga3").click();
        cy.get("#harga4").click();
        cy.get("#harga1").should("be.checked");
        cy.get("#harga2").should("be.checked");
        cy.get("#harga3").should("be.checked");
        cy.get("#harga4").should("be.checked");
    })

    it("options should be uncheck when the clear filter is clicked", () => {
        cy.mount(<Dropdown updateFilteredData={() => {}} updateDataToOriginal={() => {}} />);
        cy.get("#dropdown").should("be.visible");
        cy.get("#dropdown").click();
        cy.get("#harga1").click();
        cy.get("#harga2").click();
        cy.get("#harga3").click();
        cy.get("#harga4").click();
        cy.get("#clear").click();
        cy.get("#harga1").should("not.be.checked");
        cy.get("#harga2").should("not.be.checked");
        cy.get("#harga3").should("not.be.checked");
        cy.get("#harga4").should("not.be.checked");
    })
})