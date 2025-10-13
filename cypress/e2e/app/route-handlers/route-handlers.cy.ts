describe("Route handlers page", () => {
    beforeEach(() => {
        cy.request("POST", "/api/seed-db").its("status").should("eq", 200);
    });

    describe("User creation form", () => {
        it("should display error messages when create user form is submitted with no data", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            cy.contains("Create New User").click();

            cy.getBySel("create-user-submit-button").click();

            cy.getByInputName("username")
                .parent()
                .find("p.text-status-danger-500")
                .should("be.visible")
                .and("contain", "Username");

            cy.getByInputName("email")
                .parent()
                .find("p.text-status-danger-500")
                .should("be.visible")
                .and("contain", "Email");

            cy.getByInputName("password")
                .parents(".grid.gap-2")
                .last()
                .find("p.text-status-danger-500")
                .should("be.visible")
                .and("contain", "Password");
        });

        it("should display correct error messages for invalid input formats", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            cy.contains("Create New User").click();

            cy.getByInputName("username").type("abc");
            cy.getByInputName("email").type("invalid-email");
            cy.getByInputName("password").type("123");

            cy.getBySel("create-user-submit-button").click();

            cy.getByInputName("username")
                .parent()
                .find("p.text-status-danger-500")
                .should("be.visible")
                .and("contain", "Username")
                .and("contain", "5");

            cy.getByInputName("password")
                .parents(".grid.gap-2")
                .last()
                .find("p.text-status-danger-500")
                .should("be.visible")
                .and("contain", "Password")
                .and("contain", "5");

            cy.getByInputName("email")
                .parent()
                .find("p.text-status-danger-500")
                .should("be.visible")
                .and("contain", "Email")
                .and("contain", "format");
        });

        it("should successfully submit the form, clear fields, and add a new user card", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            const username = "newuser_rh";
            const email = "newuser_rh@example.com";
            const password = "password_rh123";

            let initialUserCount = 0;

            cy.getBySel("user-cards-list")
                .children()
                .then(($cards) => {
                    initialUserCount = $cards.length;
                    cy.log(`Initial user count: ${initialUserCount}`);
                });

            cy.contains("Create New User").click();

            cy.getByInputName("username").type(username);
            cy.getByInputName("email").type(email);
            cy.getByInputName("password").type(password);

            cy.getBySel("create-user-submit-button").click();

            cy.contains("Successfully created user!").should("be.visible");

            cy.getBySel("user-cards-list")
                .children()
                .then(($cards) => {
                    const finalUserCount = $cards.length;
                    cy.log(`Final user count: ${finalUserCount}`);
                    cy.log(finalUserCount.toString());
                    expect(finalUserCount).to.equal(initialUserCount + 1);
                });

            cy.getBySel("user-cards-list")
                .last()
                .within(() => {
                    cy.contains(username).should("be.visible");
                    cy.contains(`Email: ${email}`).should("be.visible");
                    cy.contains(`Password: ${password}`).should("be.visible");
                });

            cy.getByInputName("username").should("have.value", "");
            cy.getByInputName("email").should("have.value", "");
            cy.getByInputName("password").should("have.value", "");
        });

        it("should prevent the creation of a new user that already exists", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            const username = "newuser_rh";
            const email = "newuser_rh@example.com";
            const password = "password_rh123";

            cy.contains("Create New User").click();

            cy.getByInputName("username").type(username);
            cy.getByInputName("email").type(email);
            cy.getByInputName("password").type(password);

            cy.getBySel("create-user-submit-button").click();

            cy.contains("Successfully created user!").should("be.visible");

            cy.getByInputName("username").should("have.value", "");
            cy.getByInputName("email").should("have.value", "");
            cy.getByInputName("password").should("have.value", "");

            let initialUserCount = 0;

            cy.getBySel("user-cards-list")
                .children()
                .then(($cards) => {
                    initialUserCount = $cards.length;
                    cy.log(`Initial user count: ${initialUserCount}`);
                });

            cy.getBySel("user-cards-list")
                .last()
                .within(() => {
                    cy.contains(username).should("be.visible");
                    cy.contains(`Email: ${email}`).should("be.visible");
                    cy.contains(`Password: ${password}`).should("be.visible");
                });

            cy.getByInputName("username").type(username);
            cy.getByInputName("email").type(email);
            cy.getByInputName("password").type(password);

            cy.getBySel("create-user-submit-button").click();

            cy.contains("User with email already exists.").should("be.visible");

            cy.getByInputName("username").should("have.value", username);
            cy.getByInputName("email").should("have.value", email);
            cy.getByInputName("password").should("have.value", password);

            cy.getBySel("user-cards-list")
                .children()
                .then(($cards) => {
                    const finalUserCount = $cards.length;
                    cy.log(`Final user count: ${finalUserCount}`);
                    cy.log(finalUserCount.toString());
                    expect(finalUserCount).to.equal(initialUserCount);
                });
        });
    });

    describe("Users section", () => {
        it("should show pre-filled user data in edit form when edit button is clicked", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            cy.getBySel("user-cards-list")
                .children()
                .first()
                .as("firstUserCard");

            let initialUsername: string;
            let initialEmail: string;
            let initialPassword: string;

            cy.get("@firstUserCard")
                .findChildBySel("user-username")
                .invoke("text")
                .then((usernameText) => {
                    initialUsername = usernameText.trim();
                    cy.log(`Initial Username: ${initialUsername}`);
                })
                .then(() =>
                    cy
                        .get("@firstUserCard")
                        .findChildBySel("user-email")
                        .invoke("text")
                )
                .then((emailText) => {
                    initialEmail = emailText.replace("Email: ", "").trim();
                    cy.log(`Initial Email: ${initialEmail}`);
                })
                .then(() =>
                    cy
                        .get("@firstUserCard")
                        .findChildBySel("user-password")
                        .invoke("text")
                )
                .then((passwordText) => {
                    initialPassword = passwordText
                        .replace("Password: ", "")
                        .trim();
                    cy.log(`Initial Password: ${initialPassword}`);
                })
                .then(() => {
                    cy.get("@firstUserCard").contains("Edit").click();

                    cy.get("@firstUserCard")
                        .contains("Save")
                        .should("be.visible");

                    cy.get("@firstUserCard")
                        .contains("Cancel")
                        .should("be.visible");

                    cy.get("@firstUserCard")
                        .children()
                        .find('input[name="username"]')
                        .should("be.visible")
                        .and("have.value", initialUsername);

                    cy.get("@firstUserCard")
                        .find('input[name="email"]')
                        .should("be.visible")
                        .and("have.value", initialEmail);

                    cy.get("@firstUserCard")
                        .find('input[name="password"]')
                        .should("be.visible")
                        .and("have.value", initialPassword);
                });
        });

        it("should revert to normal state with initial data when cancel button is clicked in edit mode", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            cy.getBySel("user-cards-list")
                .children()
                .first()
                .as("firstUserCard");

            let initialUsername: string;
            let initialEmail: string;
            let initialPassword: string;

            cy.get("@firstUserCard")
                .findChildBySel("user-username")
                .invoke("text")
                .then((usernameText) => {
                    initialUsername = usernameText.trim();
                    cy.log(`Initial Username: ${initialUsername}`);
                })
                .then(() =>
                    cy
                        .get("@firstUserCard")
                        .findChildBySel("user-email")
                        .invoke("text")
                )
                .then((emailText) => {
                    initialEmail = emailText.replace("Email: ", "").trim();
                    cy.log(`Initial Email: ${initialEmail}`);
                })
                .then(() =>
                    cy
                        .get("@firstUserCard")
                        .findChildBySel("user-password")
                        .invoke("text")
                )
                .then((passwordText) => {
                    initialPassword = passwordText
                        .replace("Password: ", "")
                        .trim();
                    cy.log(`Initial Password: ${initialPassword}`);
                })
                .then(() => {
                    cy.get("@firstUserCard").contains("Edit").click();

                    cy.get("@firstUserCard")
                        .contains("Save")
                        .should("be.visible");

                    cy.get("@firstUserCard")
                        .find('input[name="username"]')
                        .clear();
                    cy.get("@firstUserCard")
                        .find('input[name="email"]')
                        .clear();
                    cy.get("@firstUserCard")
                        .find('input[name="password"]')
                        .clear();

                    cy.get("@firstUserCard")
                        .contains("Cancel")
                        .should("be.visible")
                        .click();

                    cy.get("@firstUserCard")
                        .contains("Save")
                        .should("not.exist");

                    cy.get("@firstUserCard")
                        .contains("Cancel")
                        .should("not.exist");

                    cy.get("@firstUserCard")
                        .contains("Edit")
                        .should("be.visible");

                    cy.get("@firstUserCard")
                        .findChildBySel("user-username")
                        .should("be.visible")
                        .and("contain", initialUsername);

                    cy.get("@firstUserCard")
                        .findChildBySel("user-email")
                        .should("be.visible")
                        .and("contain", initialEmail);

                    cy.get("@firstUserCard")
                        .findChildBySel("user-password")
                        .should("be.visible")
                        .and("contain", initialPassword);
                });
        });

        it("should update user data and revert to normal state when save button is clicked with valid data", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            cy.getBySel("user-cards-list")
                .children()
                .first()
                .as("firstUserCard");

            const newUsername = "updateduser";
            const newEmail = "updated@example.com";
            const newPassword = "updatedpass123";

            cy.get("@firstUserCard").contains("Edit").click();

            cy.get("@firstUserCard")
                .find('input[name="username"]')
                .clear()
                .type(newUsername);
            cy.get("@firstUserCard")
                .find('input[name="email"]')
                .clear()
                .type(newEmail);
            cy.get("@firstUserCard")
                .find('input[name="password"]')
                .clear()
                .type(newPassword);

            cy.get("@firstUserCard").contains("Save").click();

            cy.contains("Successfully edited user!").should("be.visible");

            cy.get("@firstUserCard").contains("Save").should("not.exist");
            cy.get("@firstUserCard").contains("Cancel").should("not.exist");
            cy.get("@firstUserCard").contains("Edit").should("be.visible");

            cy.get("@firstUserCard")
                .findChildBySel("user-username")
                .should("be.visible")
                .and("contain", newUsername);

            cy.get("@firstUserCard")
                .findChildBySel("user-email")
                .should("be.visible")
                .and("contain", newEmail);

            cy.get("@firstUserCard")
                .findChildBySel("user-password")
                .should("be.visible")
                .and("contain", newPassword);
        });

        it("should delete a user card when the delete button is clicked", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            let initialUserCount = 0;
            let deletedUsername: string;

            cy.getBySel("user-cards-list")
                .children()
                .then(($cards) => {
                    initialUserCount = $cards.length;
                    cy.log(`Initial user count: ${initialUserCount}`);
                });

            cy.getBySel("user-cards-list")
                .children()
                .first()
                .as("firstUserCard");

            cy.get("@firstUserCard")
                .findChildBySel("user-username")
                .invoke("text")
                .then((usernameText) => {
                    deletedUsername = usernameText.trim();
                    cy.log(`Deleted Username: ${deletedUsername}`);
                });

            cy.get("@firstUserCard").contains("Delete").click();

            cy.contains("Successfully deleted user!").should("be.visible");

            cy.getBySel("user-cards-list")
                .children()
                .then(($cards) => {
                    const finalUserCount = $cards.length;
                    cy.log(`Final user count: ${finalUserCount}`);
                    expect(finalUserCount).to.equal(initialUserCount - 1);
                });

            cy.getBySel("user-cards-list")
                .children()
                .each(($card) => {
                    cy.wrap($card)
                        .findChildBySel("user-username")
                        .should("not.contain", deletedUsername);
                });
        });

        it("should display an error and remain in edit mode when updating with an existing username", () => {
            cy.visit("/route-handlers");
            cy.scrollTo("bottom");

            cy.getBySel("user-cards-list")
                .children()
                .first()
                .as("firstUserCard");

            cy.getBySel("user-cards-list")
                .children()
                .eq(1) // Get the second user card
                .findChildBySel("user-username")
                .invoke("text")
                .then((existingUsername) => {
                    const conflictingUsername = existingUsername.trim();
                    cy.log(`Conflicting Username: ${conflictingUsername}`);

                    cy.get("@firstUserCard").contains("Edit").click();

                    cy.get("@firstUserCard")
                        .find('input[name="username"]')
                        .clear()
                        .type(conflictingUsername);

                    cy.get("@firstUserCard").contains("Save").click();

                    cy.contains("User with username already exists.").should(
                        "be.visible"
                    );

                    cy.get("@firstUserCard")
                        .contains("Save")
                        .should("be.visible");

                    cy.get("@firstUserCard")
                        .contains("Cancel")
                        .should("be.visible");
                });
        });
    });
});
