describe("Register", () => {
    it("should visit register", () => {
        cy.visit("/register");
    });

    beforeEach(() => {
        cy.visit("/register");
    });

    afterEach(() => {
        cy.wait(500);
    });

    it("should toggle password visibility correctly", () => {
        cy.get("input[id=password]").type("testpassword");
        cy.get("input[id=confirmPassword]").type("testpassword");
        cy.get("input[id=password]").should("have.attr", "type", "password");
        cy.get("input[id=confirmPassword]").should(
            "have.attr",
            "type",
            "password"
        );
        cy.get("input[id=password]").click();
        cy.get("input[id=confirmPassword]").click();
        cy.get("input[id=password]").should("have.attr", "type", "text");
        cy.get("input[id=confirmPassword]").should("have.attr", "type", "text");
        cy.get("input[id=password]").click();
        cy.get("input[id=confirmPassword]").click();
        cy.get("input[id=password]").should("have.attr", "type", "password");
        cy.get("input[id=confirmPassword]").should(
            "have.attr",
            "type",
            "password"
        );
    });

    it("should display the register form", () => {
        cy.get("form").should("exist");
        cy.get("form")
            .should("be.visible")
            .and("have.length", 1)
            .and("contain", "Email")
            .and("contain", "Nama")
            .and("contain", "Nomor Telepon")
            .and("contain", "Password")
            .and("contain", "Confirm Password");
    });

    it("should require all input", () => {
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
    });

    it("should validate email input", () => {
        cy.get("input[id=email]").type("user123");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Email tidak valid!");
    });

    it("should require name input", () => {
        cy.get("input[id=email]").type("user123@gmail.com");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Nama tidak boleh kosong!");
    });

    it("should require nomor telepon input", () => {
        cy.get("input[id=email]").type("user123@gmail.com");
        cy.get("input[id=name]").type("user123");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Nomor telepon tidak boleh kosong!");
    });

    it("should validate password input", () => {
        cy.get("input[id=email]").type("user123@gmail.com");
        cy.get("input[id=name]").type("user123");
        cy.get("input[id=no_telp]").type("111122223333");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Password tidak boleh kosong!");
    });

    it("should validate confirm password input", () => {
        cy.get("input[id=email]").type("user123@gmail.com");
        cy.get("input[id=name]").type("user123");
        cy.get("input[id=no_telp]").type("111122223333");
        cy.get("input[id=password]").type("thisisapassword");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Please enter password confirmation!");
    });

    it("should validate password and password confirmation", () => {
        cy.get("input[id=email]").type("user123@gmail.com");
        cy.get("input[id=name]").type("user123");
        cy.get("input[id=no_telp]").type("111122223333");
        cy.get("input[id=password]").type("thisisapassword");
        cy.get("input[id=confirmpassword]").type("thisisa");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Passwords do not match!");
    });

    it("should validate unique email", () => {
        cy.get("input[id=email]").type("testemail@gmail.com");
        cy.get("input[id=name]").type("user123");
        cy.get("input[id=no_telp]").type("111122223333");
        cy.get("input[id=password]").type("thisisapassword");
        cy.get("input[id=confirmpassword]").type("thisisapassword");
        cy.get("form").find("button[id=submit]").click();
        cy.get("div.error_toast div div").should("be.visible");
        cy.get("div.error_toast div div div div[role='status']")
            .invoke("text")
            .should("eq", "Email sudah terdaftar!");
    });

    it("should redirect user to login page", () => {
        cy.get("div[id=acclogin] a[href='/login']").click();
        cy.location("pathname").should("eq", "/login");
        cy.go("back");
    });
});
