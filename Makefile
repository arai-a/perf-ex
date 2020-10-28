all:
	rm -f perf-ex.xpi
	zip -9 perf-ex.xpi perf-ex.js manifest.json

i: all
	open -a FirefoxNightly perf-ex.xpi

ia: all
	open -a FirefoxAurora perf-ex.xpi
