EESchema Schematic File Version 2  date Mon 06 May 2013 11:24:16 PM PDT
LIBS:power
LIBS:device
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:special
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:aquarium-control-cache
EELAYER 25  0
EELAYER END
$Descr A4 11700 8267
encoding utf-8
Sheet 1 1
Title ""
Date "7 may 2013"
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Connection ~ 3800 4600
Wire Wire Line
	3800 4000 3800 4600
Wire Wire Line
	3800 4600 3800 4700
Wire Wire Line
	4400 4400 4200 4400
Wire Wire Line
	4200 4400 3650 4400
Wire Wire Line
	5200 4900 5200 5000
Wire Wire Line
	5200 4500 5200 4400
Wire Wire Line
	5200 4400 5200 4100
Connection ~ 5200 4400
Wire Wire Line
	5200 4100 2400 4100
Wire Wire Line
	2400 4100 2400 4300
Wire Wire Line
	2400 4300 2500 4300
Wire Wire Line
	3800 5100 3800 5200
Connection ~ 2300 4500
Wire Wire Line
	2300 4800 2300 4600
Wire Wire Line
	2300 4600 2300 4500
Wire Wire Line
	2300 4500 2300 4400
Wire Wire Line
	2300 4400 2500 4400
Wire Wire Line
	2300 4600 2500 4600
Wire Wire Line
	2300 4500 2500 4500
Connection ~ 2300 4600
Wire Wire Line
	3800 4600 3650 4600
Wire Wire Line
	4200 4400 4200 4500
Connection ~ 4200 4400
Wire Wire Line
	4200 4900 4200 5000
Wire Wire Line
	5000 4400 5200 4400
$Comp
L +12V #PWR?
U 1 1 51889D9C
P 3800 4000
F 0 "#PWR?" H 3800 3950 20  0001 C CNN
F 1 "+12V" H 3800 4100 30  0000 C CNN
	1    3800 4000
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR?
U 1 1 51889CEB
P 5200 5000
F 0 "#PWR?" H 5200 5000 30  0001 C CNN
F 1 "GND" H 5200 4930 30  0001 C CNN
	1    5200 5000
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR?
U 1 1 51889CE8
P 4200 5000
F 0 "#PWR?" H 4200 5000 30  0001 C CNN
F 1 "GND" H 4200 4930 30  0001 C CNN
	1    4200 5000
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR?
U 1 1 51889C59
P 3800 5200
F 0 "#PWR?" H 3800 5200 30  0001 C CNN
F 1 "GND" H 3800 5130 30  0001 C CNN
	1    3800 5200
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR?
U 1 1 51889C28
P 2300 4800
F 0 "#PWR?" H 2300 4800 30  0001 C CNN
F 1 "GND" H 2300 4730 30  0001 C CNN
	1    2300 4800
	1    0    0    -1  
$EndComp
$Comp
L DIODESCH D?
U 1 1 51889BF9
P 4200 4700
F 0 "D?" H 4200 4800 40  0000 C CNN
F 1 "DIODESCH" H 4200 4600 40  0000 C CNN
	1    4200 4700
	0    -1   -1   0   
$EndComp
$Comp
L INDUCTOR L?
U 1 1 51889BDF
P 4700 4400
F 0 "L?" V 4650 4400 40  0000 C CNN
F 1 "INDUCTOR" V 4800 4400 40  0000 C CNN
	1    4700 4400
	0    -1   -1   0   
$EndComp
$Comp
L CP1 C?
U 1 1 51889BB6
P 3800 4900
F 0 "C?" H 3850 5000 50  0000 L CNN
F 1 "22u" H 3850 4800 50  0000 L CNN
	1    3800 4900
	1    0    0    -1  
$EndComp
$Comp
L CP1 C?
U 1 1 51889BAC
P 5200 4700
F 0 "C?" H 5250 4800 50  0000 L CNN
F 1 "220u" H 5250 4600 50  0000 L CNN
	1    5200 4700
	1    0    0    -1  
$EndComp
$Comp
L LM2574N U1
U 1 1 51889B56
P 3050 4550
F 0 "U1" H 3300 4600 60  0000 C CNN
F 1 "LM2574N" H 2950 4600 60  0000 C CNN
	1    3050 4550
	0    1    1    0   
$EndComp
$Comp
L D3043 U3
U 1 1 518899F6
P 7550 3950
F 0 "U3" H 7050 3950 60  0000 C CNN
F 1 "D3043" H 7450 3950 60  0000 C CNN
	1    7550 3950
	1    0    0    -1  
$EndComp
$Comp
L D3043 U2
U 1 1 518899F2
P 6650 3950
F 0 "U2" H 6150 3950 60  0000 C CNN
F 1 "D3043" H 6550 3950 60  0000 C CNN
	1    6650 3950
	1    0    0    -1  
$EndComp
$EndSCHEMATC
