install:
	npm ci

lint:
	npx eslint .

lintFix: 
	npx eslint . --fix

publish:
	npm publish --dry-run

test:
	npx jest

test_w:
	npx jest --watch
	
my_test:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

my_test_plain:
	bin/gendiff.js __fixtures__/My_file1.json __fixtures__/My_file2.json
	
# Если, например, существует и задача "test" и файл "test",
# то нужно вписать "test" в ".PHONY" , чтобы цель выполнялась
.PHONY: test,