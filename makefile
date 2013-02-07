clean:
	rm -r ./dump/*
test: test.js
	node test.js
bootstrap: ./dump/bootstrap.less
	lessc ./dump/bootstrap.less > ./bootstrap.css