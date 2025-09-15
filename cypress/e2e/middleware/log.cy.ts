describe("Middleware logging page", () => {
    it("should display custom request information from intercepted headers", () => {
        const customIp = "192.168.1.100";
        const customUserAgent = "Cypress-Test-Agent/1.0";
        const customCountry = "US";
        const customRegion = "CA";
        const customCity = "San Francisco";
        const customTimezone = "America/Los_Angeles";
        const serverTimeRaw = new Date().toISOString();

        cy.intercept(
            {
                method: "GET",
                url: "/middleware/log",
            },
            (req) => {
                req.headers["x-forwarded-for"] = customIp;
                req.headers["user-agent"] = customUserAgent;
                req.headers["x-geo-country"] = customCountry;
                req.headers["x-geo-region"] = customRegion;
                req.headers["x-geo-city"] = customCity;
                req.headers["x-geo-tz"] = customTimezone;
            }
        ).as("logPageRequest");

        cy.visit("/middleware/log");
        cy.wait("@logPageRequest");

        cy.getBySel("card-content-ip-address").should("contain", customIp);

        cy.getBySel("card-content-server-time").should(
            "contain",
            new Date(serverTimeRaw).toLocaleString()
        );

        cy.getBySel("card-content-geo-location").should(
            "contain",
            `${customCity}, ${customRegion}, ${customCountry} (Timezone: ${customTimezone})`
        );

        cy.getBySel("card-content-user-agent").should(
            "contain",
            customUserAgent
        );
    });
});
