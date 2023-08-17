export function MyComponent() {
	return (
		"<!DOCTYPE html>" +
		(
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<script src="/static/htmx.min.js"></script>
				</head>
				<body hx-boost="true" hx-ext="sse,ws">
					<form action="/posts" method="post" hx-trigger="reset" hx-vals={{ foo: "bar" }}>
						<label for="author">
							Author
							<input type="text" name="author" />
						</label>
						<button type="submit">Submit</button>
					</form>
				</body>
			</html>
		)
	);
}
