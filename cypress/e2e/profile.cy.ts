describe("Profile", () => {
    beforeEach(() => {
        cy.loginWithTestAccount("testingaccount@gmail.com", "testaccount13579");
        cy.get("a#profile[href='/profile']").click();
        cy.wait(500);
    });

    it("should redirect to edit profile page", () => {
        cy.get("button#editProfile").click();
        cy.location("pathname").should("eq", "/profile/editProfile");
    });

    it("should redirect to change password page", () => {
        cy.get("button#changePassword").click();
        cy.location("pathname").should("eq", "/profile/changePassword");
    });

    it("should redirect to logout", () => {
        cy.get("button#logout").click();
        cy.location("pathname").should("eq", "/login");
    });
});
