ifeq (build,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

run:
	python devserver.py dist=9000

clean:
	@rm -Rf dist

npm:
	@npm install

pack:
	@node_modules/.bin/webpack -d --watch

build:
	gulp build --env $(RUN_ARGS)
