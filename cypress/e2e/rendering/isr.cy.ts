describe("ISR Page", () => {
    it("should revalidate and display updated crypto prices after 10 seconds when the refresh button is clicked", () => {
        const revalidateTime = 10;
        const waitBuffer = 5; // Additional buffer for network latency, etc.
        const totalWaitTime = (revalidateTime + waitBuffer) * 1000;

        cy.visit("/rendering/isr");

        let initialPrices: number[] = [];

        cy.getBySel("crypto-price")
            .each(($el) => {
                const price = parseInt($el.text().substring(1));
                cy.log(`${price}`);
                expect(price).not.to.be.NaN;
                initialPrices.push(price);
            })
            .then(() => {
                cy.log("Initial Prices:", initialPrices);
                expect(initialPrices.length).to.equal(
                    4,
                    "initialPrices should have 4 crypto prices displayed"
                );
            });

        cy.log(
            `Waiting for ${totalWaitTime / 1000} seconds for ISR revalidation...`
        );
        cy.wait(totalWaitTime);

        cy.getBySel("refresh-button").click();
        const finalPrices: number[] = [];

        cy.getBySel("crypto-price")
            .each(($el) => {
                const price = parseInt($el.text().substring(1));
                cy.log(`${price}`);
                expect(price).not.to.be.NaN;
                finalPrices.push(price);
            })
            .then(() => {
                cy.log("Final Prices:", finalPrices);
                expect(finalPrices.length).to.equal(
                    4,
                    "finalPrices should have 4 crypto prices displayed"
                );

                let pricesChanged = false;
                for (let i = 0; i < initialPrices.length; i++) {
                    if (initialPrices[i] !== finalPrices[i]) {
                        cy.log(
                            `Found updated price at index ${i}: ${initialPrices[i]} !== ${finalPrices[i]}.`
                        );
                        pricesChanged = true;
                        break;
                    }
                }
                expect(pricesChanged).to.be.true;
            });
    });
});
