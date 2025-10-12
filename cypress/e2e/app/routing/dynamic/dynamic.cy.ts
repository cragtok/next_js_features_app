describe("Dynamic Routing Page", () => {
    it("should display 'URL is empty' error and not navigate when form is submitted with no data", () => {
        cy.visit("/routing/dynamic");

        cy.url().as("initialUrl");

        cy.getBySel("dynamic-route-input")
            .as("dynamicInputForm")
            .should("have.value", "");

        cy.contains("button", "Navigate").click();

        cy.get("@initialUrl").then((initialUrl) => {
            cy.url().should("eq", initialUrl);
        });

        cy.get("@dynamicInputForm")
            .next("p")
            .contains("URL is empty")
            .should("be.visible");
    });

    it("should navigate to the correct dynamic route when a single word segment is submitted", () => {
        cy.visit("/routing/dynamic");

        const routeSegment = "test-segment";
        const expectedUrl = `${Cypress.env("baseUrl")}/routing/dynamic/${routeSegment}`;

        cy.getBySel("dynamic-route-input").type(routeSegment);

        cy.contains("button", "Navigate").click();

        cy.url().should("eq", expectedUrl);

        cy.getBySel("dynamic-segment").should("contain", routeSegment);
    });

    it("should navigate to the correct dynamic route when a multi-segment path is submitted", () => {
        cy.visit("/routing/dynamic");

        const routeSegment = "segment1/segment2/segment3";
        const expectedUrl = `${Cypress.env("baseUrl")}/routing/dynamic/${routeSegment}`;

        cy.getBySel("dynamic-route-input").type(routeSegment);

        cy.contains("button", "Navigate").click();

        cy.url().should("eq", expectedUrl);

        cy.getBySel("dynamic-segment").should("contain", routeSegment);
    });

    it("should display an error and not navigate when the route segment exceeds max length", () => {
        cy.visit("/routing/dynamic");

        cy.url().as("initialUrl");

        const maxLength = 80;
        const longRouteSegment = "a".repeat(maxLength + 1); // Create a string longer than max length

        cy.getBySel("dynamic-route-input")
            .as("dynamicInputForm")
            .type(longRouteSegment);

        cy.contains("button", "Navigate").click();

        cy.get("@initialUrl").then((initialUrl) => {
            cy.url().should("eq", initialUrl);
        });

        cy.get("@dynamicInputForm")
            .next("p")
            .contains(
                `Route segment cannot have more than ${maxLength} characters`
            )
            .should("be.visible");
    });

    ["http://", "https://", "//"].forEach((prefix) => {
        it(`should display an error and not navigate when the route segment starts with an external URL prefix: ${prefix}`, () => {
            cy.visit("/routing/dynamic");

            cy.url().as("initialUrl");

            const invalidRouteSegment = `${prefix}example.com/path`;

            cy.getBySel("dynamic-route-input")
                .as("dynamicInputForm")
                .type(invalidRouteSegment);

            cy.contains("button", "Navigate").click();

            cy.get("@initialUrl").then((initialUrl) => {
                cy.url().should("eq", initialUrl);
            });

            cy.get("@dynamicInputForm")
                .next("p")
                .contains(
                    "External URLs are not allowed in dynamic route segments."
                )
                .should("be.visible");
        });
    });

    it("should display an error and not navigate when the route segment contains invalid characters", () => {
        cy.visit("/routing/dynamic");

        cy.url().as("initialUrl");

        const invalidRouteSegment = "invalid!@#segment";

        cy.getBySel("dynamic-route-input")
            .as("dynamicInputForm")
            .type(invalidRouteSegment);

        cy.contains("button", "Navigate").click();

        cy.get("@initialUrl").then((initialUrl) => {
            cy.url().should("eq", initialUrl);
        });

        cy.get("@dynamicInputForm")
            .next("p")
            .contains(
                "Only alphanumeric, spaces, hyphens, underscores, and forward slashes are allowed."
            )
            .should("be.visible");
    });

    it("should navigate to a statically generated dynamic route and display static content message", () => {
        cy.visit("/routing/dynamic");

        const staticRouteSegment = "hello_world";
        const expectedUrl = `${Cypress.env("baseUrl")}/routing/dynamic/${staticRouteSegment}`;

        cy.getBySel("dynamic-route-input").type(staticRouteSegment);

        cy.contains("button", "Navigate").click();

        cy.url().should("eq", expectedUrl);

        cy.contains(
            "p",
            "This dynamic route segment is statically generated at build time."
        ).should("be.visible");

        cy.getBySel("dynamic-segment").should("contain", staticRouteSegment);
    });

    it("should navigate to a non-statically generated dynamic route and not display static content message", () => {
        cy.visit("/routing/dynamic");

        const nonStaticRouteSegment = "non-static-segment";
        const expectedUrl = `${Cypress.env("baseUrl")}/routing/dynamic/${nonStaticRouteSegment}`;

        cy.getBySel("dynamic-route-input").type(nonStaticRouteSegment);

        cy.contains("button", "Navigate").click();

        cy.url().should("eq", expectedUrl);

        cy.contains(
            "p",
            "This dynamic route segment is statically generated at build time."
        ).should("not.exist");

        cy.getBySel("dynamic-segment").should("contain", nonStaticRouteSegment);
    });
});
