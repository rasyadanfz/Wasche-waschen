import React, { useState } from "react";
import FormInput from "../../src/components/FormInput";

describe("<FormInput />", () => {
    it("renders", () => {
        cy.mount(
            <FormInput
                type="text"
                id="email"
                text="Email"
                placeholder="Email"
            />
        );
        cy.get("input").should("be.visible");
    });

    it("renders the correct label", () => {
        cy.mount(
            <FormInput
                type="text"
                id="email"
                text="Email"
                placeholder="Email"
            />
        );
        cy.get("input").should("be.visible");
        cy.get("label[for=email]").should("be.visible");
        cy.get("label[for=email]").should("have.text", "Email");
    });
    it("have correct attributes", () => {
        cy.mount(
            <FormInput
                type="text"
                id="email"
                text="Email"
                placeholder="Email"
            />
        );
        cy.get("input#email").should("be.visible");
        cy.get("input#email").should("have.attr", "type", "text");
        cy.get("input#email").should("have.attr", "placeholder", "Email");
    });

    it("calls onChange correctly", () => {
        let text = "";
        const change = (e: React.ChangeEvent<HTMLInputElement>) => {
            text = e.target.value;
        };

        cy.mount(
            <FormInput
                type="text"
                id="email"
                text="Email"
                placeholder="Email"
                onChange={change}
            />
        );
        cy.get("input#email").should("be.visible");
        cy.get("input#email")
            .type("test")
            .then(() => {
                cy.get("input#email").should("have.value", "test");
                expect(text).to.eq("test");
            });
    });

    it("toggle show password correctly", () => {
        let status = false;
        const simulateSetPassword = () => {
            status = !status;
        };
        cy.mount(
            <FormInput
                type="password"
                id="password"
                text="Password"
                placeholder="Password"
                setShowPassword={simulateSetPassword}
            />
        );
        const button = cy.get("button#showPassword");
        button.should("be.visible");
        button.click().then(() => {
            expect(status).to.eq(true);
            button.click().then(() => {
                expect(status).to.eq(false);
            });
        });
    });
});
