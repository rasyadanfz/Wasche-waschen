import React from "react";
import TextField from "../../src/components/TextField";

describe("<TextField />", () => {
    it("renders", () => {
        cy.mount(<TextField id="textfield123" />);
        cy.get("input#textfield123").should("be.visible");
    });

    it("should have the correct attributes", () => {
        cy.mount(
            <TextField id="textfield123" placeholder="test" type="text" />
        );
        cy.get("input#textfield123").should("be.visible");
        cy.get("input#textfield123").should("have.attr", "placeholder", "test");
        cy.get("input#textfield123").should("have.attr", "type", "text");
        cy.get("input#textfield123").should("have.attr", "value", "");
    });

    it("have correct width and height classnames", () => {
        cy.mount(<TextField id="textfield123" width="full" height="full" />);
        cy.get("input#textfield123").should("be.visible");
        cy.get("input#textfield123").should("have.class", "w-full");
        cy.get("input#textfield123").should("have.class", "h-full");
    });

    it("correctly execute onChange", () => {
        let text = "";
        const change = (e: React.ChangeEvent<HTMLInputElement>) => {
            text = e.target.value;
        };
        cy.mount(<TextField id="textfield123" onChange={change} />);
        cy.get("input#textfield123").should("be.visible");
        cy.get("input#textfield123")
            .type("test")
            .then(() => {
                cy.get("input#textfield123").should("have.value", "test");
            });
    });
});
