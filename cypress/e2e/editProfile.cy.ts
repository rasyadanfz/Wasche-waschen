describe("Edit Profile", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("testingaccount@gmail.com", "testaccount13579");
        cy.get("a#profile[href='/profile']").click();
        cy.wait(500);
        cy.get("button#editProfile").click();
        cy.wait(500);
    });

    it("should be able cancel edit profile", () => {
        cy.get("button#cancelBtn").click();
        cy.location("pathname").should("eq", "/profile");
    });

    it("should display edit profile form", () => {
        cy.get("form").should("exist");
        cy.get("form")
            .should("be.visible")
            .and("have.length", 1) // check if there is only 1 form
            .and("contain", "Nama") // check if the form contains the text "Email"
            .and("contain", "Email")
            .and("contain", "Nomor Telepon");
    });

    it("should require name input", () => {
        cy.get("input[id=name]").clear();
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your name!");
    });

    it("should require email input", () => {
        cy.get("input[id=email]").clear();
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your email!");
    });

    it("should validate email input", () => {
        cy.get("input[id=email]").clear().type("user123");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Email not valid!");
    });

    it("should require no telp input", () => {
        cy.get("input[id=no_telp]").clear();
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your phone number!");
    });

    it("should successfully edit profile", () => {
        cy.get("input[id=name]").clear().type("Testing Account");
        cy.get("input[id=email]").clear().type("testingaccount@gmail.com");
        cy.get("input[id=no_telp]").clear().type("081234567890");
        cy.get("form").find("button[id=submit]").click();
        cy.wait(3000);
        cy.location("pathname").should("eq", "/profile");
    });
});
