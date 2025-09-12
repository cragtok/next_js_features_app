describe("Server Actions Form Submission", () => {
    it("should display error messages when form is submitted with no data", () => {
        cy.visit("/server-actions");

        cy.getBySel("submit-button").contains("Submit").click();

        cy.get('input[name="username"]')
            .parent()
            .find("p.text-status-danger-500")
            .should("be.visible")
            .and("contain", "Username");

        cy.get('input[name="email"]')
            .parent()
            .find("p.text-status-danger-500")
            .should("be.visible")
            .and("contain", "Email");

        cy.get('input[name="password"]')
            .parents(".grid.gap-2")
            .last()
            .find("p.text-status-danger-500")
            .should("be.visible")
            .and("contain", "Password");
    });

    it("should display username length error when username is less than 5 characters", () => {
        cy.visit("/server-actions");

        cy.get('input[name="username"]').type("abc");

        cy.getBySel("submit-button").contains("Submit").click();

        cy.get('input[name="username"]')
            .parent()
            .find("p.text-status-danger-500")
            .should("be.visible")
            .and("contain", "Username")
            .and("contain", "5");
    });

    it("should email format error when email is not in proper format", () => {
        cy.visit("/server-actions");

        cy.get('input[name="email"]').type("email");

        cy.getBySel("submit-button").contains("Submit").click();

        cy.get('input[name="email"]')
            .parent()
            .find("p.text-status-danger-500")
            .should("be.visible")
            .and("contain", "Email")
            .and("contain", "format");
    });

    it("should display password length error when password is less than 5 characters", () => {
        cy.visit("/server-actions");

        cy.contains("Create an Account").should("be.visible");

        cy.get('input[name="password"]').type("abc");

        cy.getBySel("submit-button").contains("Submit").click();

        cy.get('input[name="password"]')
            .parents(".grid.gap-2")
            .find("p.text-status-danger-500")
            .should("be.visible")
            .and("contain", "Password")
            .and("contain", "5");
    });

    describe("Successful form submission", () => {
        before(() => {
            cy.request("POST", "/api/seed-db")
                .its("status")
                .should("eq", 200);
        });
        it("should successfully submit the form, clear fields, and add a new user card", () => {
            cy.visit("/server-actions");

            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";

            let initialUserCount = 0;

            cy.getBySel("users-list")
                .children()
                .then(($children) => {
                    initialUserCount = $children.length;
                    cy.log(`Initial user count: ${initialUserCount}`);
                });

            cy.get('input[name="username"]').type(username);
            cy.get('input[name="email"]').type(email);
            cy.get('input[name="password"]').type(password);

            cy.getBySel("submit-button")
                .should("not.be.disabled")
                .and("contain", "Submit");

            cy.getBySel("submit-button").click();

            cy.contains("Successfully created user!").should("be.visible");

            cy.get('input[name="username"]').should("have.value", "");
            cy.get('input[name="email"]').should("have.value", "");
            cy.get('input[name="password"]').should("have.value", "");

            cy.wait(1000);

            cy.getBySel("users-list")
                .children()
                .then(($children) => {
                    const finalUserCount = $children.length;
                    cy.log(`Final user count: ${finalUserCount}`);
                    cy.log(finalUserCount.toString());
                    expect(finalUserCount).to.equal(initialUserCount + 1);
                });

            cy.getBySel("users-list")
                .children()
                .last()
                .within(() => {
                    cy.contains(`Username: ${username}`).should("be.visible");
                    cy.contains(`Email: ${email}`).should("be.visible");
                    cy.contains(`Password: ${password}`).should("be.visible");
                });
        });
    });
});
