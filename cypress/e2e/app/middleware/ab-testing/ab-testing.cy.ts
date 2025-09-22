describe("A/B Testing Middleware", () => {
    ["A", "B"].forEach((group) => {
        it(`should display group ${group} content when ab-test-group cookie is ${group}`, () => {
            cy.setCookie("ab-test-group", group);

            cy.visit("/middleware/ab-testing");

            cy.getBySel("ab-test-group")
                .should("contain", `You are in group ${group}`)
                .and(
                    "have.class",
                    group === "A" ? "text-green-400" : "text-blue-400"
                );
        });
    });
});
