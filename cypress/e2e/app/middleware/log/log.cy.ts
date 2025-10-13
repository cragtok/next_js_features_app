describe("Middleware logging page", () => {
    it("should display custom request information from intercepted headers", () => {
        const customIp = "192.168.1.100";
        const customUserAgent = "Cypress-Test-Agent/1.0";
        const serverTime = new Date().toLocaleTimeString();

        cy.intercept(
            {
                method: "GET",
                url: "/middleware/log",
            },
            (req) => {
                req.headers["x-forwarded-for"] = customIp;
                req.headers["x-server-time"] = serverTime;
                req.headers["user-agent"] = customUserAgent;
            }
        ).as("logPageRequest");

        cy.visit("/middleware/log");
        cy.wait("@logPageRequest");

        cy.getBySel("card-content-ip-address").should("contain", customIp);

        cy.getBySel("card-content-server-time").should("contain", serverTime);

        cy.getBySel("card-content-user-agent").should(
            "contain",
            customUserAgent
        );
    });
});
