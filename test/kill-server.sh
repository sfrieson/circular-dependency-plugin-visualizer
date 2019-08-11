#!/bin/bash
kill $(ps aux | grep '[n]ode test/server' | awk '{print $2}')