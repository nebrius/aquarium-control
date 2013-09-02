#!/usr/bin/python
'''
    Copyright (C) 2013  Bryan Hughes <bryan@theoreticalideations.com>

    This file is part of Aquarium Control.

    Aquarium Control is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Aquarium Control is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Aquarium Control.  If not, see <http://www.gnu.org/licenses/>.
'''
# Validate the state
import sys
if len(sys.argv) is not 2:
    print("State is required")
    exit(1)
state = sys.argv[1]
if state != "day" and state != "night" and state != "off":
    print("Invalid state " + state)
    exit(1)

# Initialize ports 19 (day) and 21 (night) as outputs
try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!  This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")
    exit(1)
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(3, GPIO.OUT)
GPIO.setup(5, GPIO.OUT)

# Set the output pins according to the state
if state == "day":
    GPIO.output(5, GPIO.LOW)
else:
    GPIO.output(5, GPIO.HIGH)

if state == "night":
    GPIO.output(3, GPIO.LOW)
else:
    GPIO.output(3, GPIO.HIGH)
