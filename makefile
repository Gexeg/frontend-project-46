install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint fix:
	npx eslint .

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js