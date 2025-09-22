describe("Client Components Page", () => {
    it("should increment the counter value when the button is clicked", () => {
        cy.visit("/components/client");

        cy.getBySel("counter-value").should("contain.text", "Count: 0");

        cy.getBySel("increment-button").click();

        cy.getBySel("counter-value").should("contain.text", "Count: 1");

        cy.getBySel("increment-button").click();

        cy.getBySel("counter-value").should("contain.text", "Count: 2");
    });
});
