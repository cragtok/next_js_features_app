describe("SSR Rendering Page", () => {
    const getQuoteAndAuthor = () => {
        let quote: string;
        let author: string;

        return cy
            .getBySel("quote")
            .should("be.visible")
            .then(($quote) => {
                quote = $quote.text();
                expect(quote).to.not.be.empty;
            })
            .getBySel("author")
            .should("be.visible")
            .then(($author) => {
                author = $author.text();
                expect(author).to.not.be.empty;
                return { quote, author };
            });
    };

    const assertNewQuoteAndAuthor = (
        initialQuote: string,
        initialAuthor: string
    ) => {
        cy.getBySel("quote")
            .should("be.visible")
            .then(($newQuote) => {
                const newQuote = $newQuote.text();
                expect(newQuote).to.not.be.empty;
                expect(newQuote).to.not.equal(initialQuote);
            });

        cy.getBySel("author")
            .should("be.visible")
            .then(($newAuthor) => {
                const newAuthor = $newAuthor.text();
                expect(newAuthor).to.not.be.empty;
                expect(newAuthor).to.not.equal(initialAuthor);
            });
    };

    it("should fetch a new quote on each page refresh", () => {
        let initialQuote: string = "";
        let initialAuthor: string = "";
        cy.visit("http://localhost:3000/rendering/ssr");

        getQuoteAndAuthor().then(({ quote, author }) => {
            initialQuote = quote;
            initialAuthor = author;
        });

        cy.reload();

        assertNewQuoteAndAuthor(initialQuote, initialAuthor);
    });

    it("should fetch a new quote on clicking the refresh button", () => {
        let initialQuote: string = "";
        let initialAuthor: string = "";

        cy.visit("http://localhost:3000/rendering/ssr");
        getQuoteAndAuthor().then(({ quote, author }) => {
            initialQuote = quote;
            initialAuthor = author;
        });

        cy.getBySel("refresh-button").click();

        assertNewQuoteAndAuthor(initialQuote, initialAuthor);
    });
});
