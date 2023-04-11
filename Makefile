install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npx jest
	
# Если, например, существует и задача "test" и файл "test",
# то нужно вписать "test" в ".PHONY" , чтобы цель выполнялась
.PHONY: test,