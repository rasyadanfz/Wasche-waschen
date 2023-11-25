import AddButton from "@/app/(pages)/(loggedIn)/catalog/components/AddButton";
import { ExistingPakaian, Pakaian } from "@prisma/client";

describe("<AddButton />", () => {
    it("renders correctly", () => {
        const pakaian: ExistingPakaian = {
            id: "1",
            name: "Pakaian 1",
            price: 10000,
            unit: "satuan",
            pakaianId: "2",
        };
        cy.mount(
            <AddButton
                pakaian={pakaian}
                updateCartCount={() => {}}
                updatePakaianInCart={() => {}}
                disabledButton={false}
            />
        );
        cy.get("#tambah_button").should("be.visible");
    });

    it("add subtract button should be visible", () => {
        const pakaian: ExistingPakaian = {
            id: "1",
            name: "Pakaian 1",
            price: 10000,
            unit: "satuan",
            pakaianId: "2",
        };
        cy.mount(
            <AddButton
                pakaian={pakaian}
                updateCartCount={() => {}}
                updatePakaianInCart={() => {}}
                disabledButton={false}
            />
        );
        cy.get("#tambah_button").should("be.visible");
        cy.get("#tambah_button").click();
        cy.get("#add_button").should("be.visible");
        cy.get("#item_count").should("be.visible");
        cy.get("#substract_button").should("be.visible");
    });

    it("should increment count when clicking the 'Tambah' button", () => {
        const pakaian: ExistingPakaian = {
            id: "1",
            name: "Pakaian 1",
            price: 10000,
            unit: "satuan",
            pakaianId: "2",
        };
        cy.mount(
            <AddButton
                pakaian={pakaian}
                updateCartCount={() => {}}
                updatePakaianInCart={() => {}}
                disabledButton={false}
            />
        );
        cy.get("#tambah_button").should("be.visible");
        cy.get("#tambah_button").click();
        cy.get("#item_count").should("have.text", "1");
    });

    it("should increment count when clicking the '+' button", () => {
        const pakaian: ExistingPakaian = {
            id: "1",
            name: "Pakaian 1",
            price: 10000,
            unit: "satuan",
            pakaianId: "2",
        };
        cy.mount(
            <AddButton
                pakaian={pakaian}
                updateCartCount={() => {}}
                updatePakaianInCart={() => {}}
                disabledButton={false}
            />
        );
        cy.get("#tambah_button").click();
        cy.get("#add_button").click();
        cy.get("#item_count").should("have.text", "2");
    });

    it("should decrement count when clicking the '-' button", () => {
        const pakaian: ExistingPakaian = {
            id: "1",
            name: "Pakaian 1",
            price: 10000,
            unit: "satuan",
            pakaianId: "2",
        };
        cy.mount(
            <AddButton
                pakaian={pakaian}
                updateCartCount={() => {}}
                updatePakaianInCart={() => {}}
                disabledButton={false}
            />
        );
        cy.get("#tambah_button").click();
        cy.get("#add_button").click();
        cy.get("#substract_button").click();
        cy.get("#item_count").should("have.text", "1");
    });

    it("should display 'Tambah' button when item count is 0", () => {
        const pakaian: ExistingPakaian = {
            id: "1",
            name: "Pakaian 1",
            price: 10000,
            unit: "satuan",
            pakaianId: "2",
        };
        cy.mount(
            <AddButton
                pakaian={pakaian}
                updateCartCount={() => {}}
                updatePakaianInCart={() => {}}
                disabledButton={false}
            />
        );
        cy.get("#tambah_button").click();
        cy.get("#substract_button").click();
        cy.get("#tambah_button").should("be.visible");
    });
});
