install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint_fix:
	npx eslint --fix .

test:
	npm test