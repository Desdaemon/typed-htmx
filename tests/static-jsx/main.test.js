describe("html templator", () => {
	it("works", () => {
		expect(<div data-foo={123} />).toBe('<div data-foo="123" />');
	});
	it("processes json attributes", () => {
		expect(<div hx-vals={{ foo: "It's joever" }} />).toBe(`<div hx-vals='{"foo":"It&#39;s joever"}'/>`);
	});
	it("skips falsy attributes", () => {
		expect(<div data-foo={false} {...{ foobar: false }} />).toBe("<div />");
	});
});
