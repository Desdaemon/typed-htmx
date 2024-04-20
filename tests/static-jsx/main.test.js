describe("html templator", () => {
	it("works", () => {
		expect(<div data-foo={123} />).toBe('<div data-foo="123"></div>');
	});
	it("processes json attributes", () => {
		expect(<div hx-vals={{ foo: "It's joever" }} />).toBe(`<div hx-vals='{"foo":"It&#39;s joever"}'></div>`);
	});
	it("skips falsy attributes", () => {
		expect(<div data-foo={false} {...{ foobar: false }} />).toBe("<div></div>");
	});
	it("correctly handles void elements", () => {
		expect(
			<>
				<img />
				<br />
			</>,
		).toBe("<img><br>");
	});
});
