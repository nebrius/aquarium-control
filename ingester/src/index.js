/*
Copyright (C) 2013-2017 Bryan Hughes <bryan@nebri.us>

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
*/

const Registry = require('azure-iothub').Registry;
const Client = require('azure-iothub').Client;
const Message = require('azure-iot-common').Message;

module.exports = {
  run
};

function run() {
  const IOT_HUB_CONNECTION_STRING = process.env.IOT_HUB_CONNECTION_STRING;
  if (typeof IOT_HUB_CONNECTION_STRING !== 'string') {
    throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
  }
  console.log('Connecting to IoT Event Hub');

  const client = Client.fromConnectionString(IOT_HUB_CONNECTION_STRING);
  client.open((err) => {
    if (err) {
      console.error('Could not connect: ' + err.message);
      return;
    }
    console.log('Connected to IoT Event Hub');

    client.getFeedbackReceiver((err, receiver) => {
      receiver.on('message', (msg) => {
        console.log('Feedback message:')
        console.log(msg.getData().toString('utf-8'));
      });
    });

    const message = new Message(JSON.stringify({
      foo: 'bar',
      baz: 'blarg'
    }));
    message.ack = 'full';
    client.send('nebrius-rpi', message, (err, res) => {
      if (err) console.log('send error: ' + err.toString());
      if (res) console.log('send status: ' + res.constructor.name);
    });

    client.on('message', (msg) => {
      console.log(msg);
    });
  });
}
