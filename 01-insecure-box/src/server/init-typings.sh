#!/bin/bash
if [ ! -d typings ]; then
  typings init
fi;

typings install env~node dt~es6-shim --global --save

typings install dt~express --global --save
typings install dt~cookie-parser dt~mime dt~body-parser dt~errorhandler dt~express-serve-static-core dt~serve-static --global --save

typings install dt~cuid --save --global

