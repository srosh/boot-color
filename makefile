LESS_FILES_DIR = ./dump
TARGET_DIR = .
BOOTSTRAP_DIR = ./bootstrap
BOOTSTRAP_TESTS = ${BOOTSTRAP_DIR}/less/tests
TARGET = ${TARGET_DIR}/bootstrap.css
TESTS = ${LESS_FILES_DIR}/tests
TEST_LINK = ${TARGET_DIR}/tests
TEST_ORIG_LINK = ${TARGET_DIR}/tests-orig


clean:
	@rm -r ${LESS_FILES_DIR}
	@rm ${TEST_LINK}
	@rm ${TEST_ORIG_LINK}
	@mkdir ${LESS_FILES_DIR}
start:
	@mkdir -p ${LESS_FILES_DIR}
	@npm install
test: start clone colors solarize bootstrap ${TARGET}
	@mkdir -p ${TESTS}
	@cp ${BOOTSTRAP_TESTS}/* ${TESTS}
	@cp ${TARGET} ${TESTS}/bootstrap.css
	@node test.js
	@ln -s ${BOOTSTRAP_TESTS} ${TEST_ORIG_LINK}
	@ln -s ${TESTS} ${TEST_LINK}
	@echo 'you can compare the files in ${TEST_LINK} with original bootstrap css test in ${TEST_ORIG_LINK}'
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
