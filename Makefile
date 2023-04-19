install:
	npm ci

lint:
	npx eslint .

lintFix: 
	npx eslint . --fix

publish:
	npm publish --dry-run

test:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

# test:
# npx jest
	
# Если, например, существует и задача "test" и файл "test",
# то нужно вписать "test" в ".PHONY" , чтобы цель выполнялась
.PHONY: test,