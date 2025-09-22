describe("CSR Page", () => {
    it("should fetch and display a joke when the button is clicked", () => {
        cy.visit("/rendering/csr");

        cy.getBySel("joke-text").should("not.exist");
        cy.getBySel("joke-error").should("not.exist");
        cy.getBySel("initial-text")
            .should("be.visible")
            .and("contain", "Click the button to fetch a joke");

        cy.getBySel("joke-fetch-button").click();
        cy.getBySel("loading-skeleton").should("exist");

        cy.getBySel("loading-skeleton").should("not.exist");
        cy.getBySel("joke-text").should("be.visible").and("not.be.empty");
        cy.getBySel("loading-skeleton").should("not.exist");

        cy.getBySel("initial-text").should("not.exist");
    });

    it("should display an error message when joke fetch is unsuccessful", () => {
        cy.intercept("GET", "https://icanhazdadjoke.com", {
            statusCode: 500,
            body: { message: "Internal Server Error" },
        }).as("getJokeError");

        cy.visit("/rendering/csr");

        cy.getBySel("joke-text").should("not.exist");
        cy.getBySel("joke-error").should("not.exist");
        cy.getBySel("initial-text")
            .should("be.visible")
            .and("contain", "Click the button to fetch a joke");

        cy.getBySel("joke-fetch-button").click();
        cy.wait("@getJokeError");

        cy.getBySel("joke-error")
            .should("be.visible")
            .and("contain", "Failed to load joke. Please try fetching again.");

        cy.getBySel("initial-text").should("not.exist");
    });
});
