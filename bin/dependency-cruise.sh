#!/bin/bash
set -eu

declare FOCUS=$1

yarn depcruise -c .dependency-cruiser.js --focus $FOCUS --output-type dot . > reports/dependencygraph.dot
dot -T svg reports/dependencygraph.dot > reports/dependencygraph.svg