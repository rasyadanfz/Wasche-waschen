describe("Change Password", () => {
    before(() => {
        cy.visit("/login");
        cy.wait(2000);
        cy.get("form").find("button[id=submit]").click();
        cy.wait(5000);
    });

    beforeEach(() => {
        cy.loginWithTestAccount("testingaccount@gmail.com", "testaccount13579");
        cy.get("a#profile[href='/profile']").click();
        cy.wait(500);
        cy.get("button#changePassword").click();
        cy.wait(1000);
    });

    it("should be able cancel change password", () => {
        cy.get("button#cancelBtn").click();
        cy.location("pathname").should("eq", "/profile");
    });

    it("should display change password form", () => {
        cy.get("form").should("exist");
        cy.get("form")
            .should("be.visible")
            .and("have.length", 1) // check if there is only 1 form
            .and("contain", "Current Password") // check if the form contains the text "Email"
            .and("contain", "New Password")
            .and("contain", "Confirm Password");
    });

    it("should require current password input", () => {
        cy.get("input[id=current-password]").clear();
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your current password!");
    });

    it("should require new password input", () => {
        cy.get("input[id=current-password]").clear();
        cy.get("input[id=current-password]").type("testaccount13579");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your new password!");
    });

    it("should require confirm password input", () => {
        cy.get("input[id=current-password]").clear();
        cy.get("input[id=current-password]").type("testaccount13579");
        cy.get("input[id=new-password]").clear();
        cy.get("input[id=new-password]").type("testaccount13579");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter your new password confirmation!");
    });

    it("should check for wrong current password", () => {
        cy.get("input[id=current-password]").clear();
        cy.get("input[id=current-password]").type("wrongpasswordtest");
        cy.get("input[id=new-password]").clear();
        cy.get("input[id=new-password]").type("testaccount13579");
        cy.get("input[id=confirm-password]").clear();
        cy.get("input[id=confirm-password]").type("testaccount13579");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Password salah!");
    });

    it("should check for wrong confirm password", () => {
        cy.get("input[id=current-password]").clear();
        cy.get("input[id=current-password]").type("testaccount13579");
        cy.get("input[id=new-password]").clear();
        cy.get("input[id=new-password]").type("testaccount13579");
        cy.get("input[id=confirm-password]").clear();
        cy.get("input[id=confirm-password]").type("wrongpasswordtest");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Passwords do not match!");
    });

    it("should successfully change password", () => {
        cy.get("input[id=current-password]").clear();
        cy.get("input[id=current-password]").type("testaccount13579");
        cy.get("input[id=new-password]").clear();
        cy.get("input[id=new-password]").type("testaccount13579");
        cy.get("input[id=confirm-password]").clear();
        cy.get("input[id=confirm-password]").type("testaccount13579");
        cy.get("form").find("button[id=submit]").click();
        cy.wait(3000);
        cy.location("pathname").should("eq", "/profile");
    });
});
