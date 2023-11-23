import React from "react";
import Button from "../../src/components/Button";

describe("<Button />", () => {
    it("renders correctly", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Button text="Button" />);
        cy.get("button").should("be.visible");
    });

    it("displays the correct text", () => {
        const text = "This is a button";
        cy.mount(<Button text={text} />);
        cy.get("button").should("be.visible");
        cy.get("button").should("contain.text", text);
    });

    it("displays the correct class based on prop", () => {
        cy.mount(<Button text="Button1" id="primarybtn" type="primary" />);
        cy.get("button[id=primarybtn]").should("be.visible");
        cy.get("button[id=primarybtn]").should(
            "have.class",
            "bg-primary-400 hover:bg-primary-300 active:bg-primary-300"
        );

        cy.mount(<Button text="Button2" id="secondarybtn" type="secondary" />);
        cy.get("button[id=secondarybtn]").should("be.visible");
        cy.get("button[id=secondarybtn]").should(
            "have.class",
            "bg-secondary-400 hover:bg-secondary-300 active:bg-secondary-300"
        );
    });

    it("executes onClick correctly", () => {
        let isClicked = false;
        let clickCount = 0;
        let msg = "";
        const click = () => {
            isClicked = true;
            clickCount += 1;
            msg = "Button Clicked";
        };

        cy.mount(<Button text="Button" onClick={click} />);
        cy.get("button").should("be.visible");
        cy.get("button")
            .click()
            .then(() => {
                cy.wait(500);
                expect(isClicked).to.be.true;
                expect(clickCount).to.eq(1);
                expect(msg).to.eq("Button Clicked");
            });
    });
});
