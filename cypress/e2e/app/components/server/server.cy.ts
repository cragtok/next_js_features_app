describe("Server Components Page", () => {
    it("should display different server time and random number after refresh", () => {
        cy.visit("/components/server");

        let initialServerTime: string;
        let initialRandomNumber: string;

        cy.getBySel("server-time")
            .invoke("text")
            .then((text) => {
                initialServerTime = text;
                cy.log(`Initial Server Time: ${initialServerTime}`);
            });

        cy.getBySel("random-number-display")
            .invoke("text")
            .then((text) => {
                initialRandomNumber = text;
                cy.log(`Initial Random Number: ${initialRandomNumber}`);
            });

        cy.getBySel("refresh-button").click();

        cy.getBySel("server-time")
            .invoke("text")
            .then((newText) => {
                cy.log(`New Server Time: ${newText}`);
                expect(newText).to.not.eq(initialServerTime);
            });

        cy.getBySel("random-number-display")
            .invoke("text")
            .then((newText) => {
                cy.log(`New Random Number: ${newText}`);
                expect(newText).to.not.eq(initialRandomNumber);
            });
    });
});
