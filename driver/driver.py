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
GPIO.setup(19, GPIO.OUT)
GPIO.setup(21, GPIO.OUT)

# Set the output pins according to the state
if state == "day":
    GPIO.output(19, GPIO.HIGH)
else:
    GPIO.output(19, GPIO.LOW)

if state == "night":
    GPIO.output(21, GPIO.HIGH)
else:
    GPIO.output(21, GPIO.LOW)
