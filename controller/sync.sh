#/bin/sh
cd ..
rsync -avz -e ssh controller --exclude node_modules pi@192.168.1.143:/home/pi
