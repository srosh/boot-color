LESS_FILES_DIR = ./dump
TARGET_DIR = .
BOOTSTRAP_DIR = ./bootstrap
TARGET = ${TARGET_DIR}/bootstrap.css

clean:
	@rm -r ${LESS_FILES_DIR}/*
super-clean:
	@git clean
start:
	npm install
test: start clone colors solarize bootstrap ${TARGET}
	@mkdir -p ${LESS_FILES_DIR}/tests
	@cp ${BOOTSTRAP_DIR}/less/tests/* ${LESS_FILES_DIR}/tests
	@cp ${TARGET} ${LESS_FILES_DIR}/tests/bootstrap.css
	@node test.js
colors:
	@node colorvars.js
solarize: ${LESS_FILES_DIR}/colors.less
	@cp ${LESS_FILES_DIR}/colors.less ${LESS_FILES_DIR}/colors-back.less
	@node solarize.js
bootstrap: ${LESS_FILES_DIR}/bootstrap.less
	@echo "compiling bootstrap.less"
	@lessc ${LESS_FILES_DIR}/bootstrap.less > ${TARGET}
clone:
	@if test -d ${BOOTSTRAP_DIR}; then echo "Bootstrap is cloned already"; else  git clone https://github.com/twitter/bootstrap.git; fi
