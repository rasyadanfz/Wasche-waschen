describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("should visit login", () => {
        cy.visit("/login");
    });

    it("should display the login form", () => {
        cy.get("form").should("exist");
        cy.get("form")
            .should("be.visible")
            .and("have.length", 1)
            .and("contain", "Email")
            .and("contain", "Password");
    });

    it("should require email input", () => {
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your email!");
    });

    it("should validate email input", () => {
        cy.get("input[id=email]").type("user123");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Email not valid!");
    });

    it("should require password input", () => {
        cy.get("input[id=email]").type("user123@gmail.com");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your password!");
    });

    it("should toggle password visibility correctly", () => {
        cy.get("input[id=password]").type("testpassword");
        cy.get("input[id=password]").should("have.attr", "type", "password");
        cy.get("input[id=password]").click();
        cy.get("input[id=password]").should("have.attr", "type", "text");
        cy.get("input[id=password]").click();
        cy.get("input[id=password]").should("have.attr", "type", "password");
    });

    it("should check for wrong password", () => {
        cy.get("input[id=email]").type("testemail@gmail.com");
        cy.get("input[id=password]").type("wrongpasswordtest");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Wrong password!");
    });

    it("should check non-existent email", () => {
        cy.get("input[id=email]").type("test@gmail.com");
        cy.get("input[id=password]").type("testpassword");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Account not found!");
    });

    it("link should redirect to register page", () => {
        cy.get("a[href='/register']").click();
        cy.location("pathname").should("eq", "/register");
        cy.go("back");
    });

    it("should successfully login", () => {
        cy.get("input[id=email]").type("developer@gmail.com");
        cy.get("input[id=password]").type("developer123");
        cy.get("form").find("button[id=submit]").click();
        cy.wait(3000);
        cy.location("pathname").should("eq", "/catalog");
    });
});
