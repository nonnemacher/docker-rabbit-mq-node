const amqp = require('amqplib/callback_api');
const readline = require('readline');

const readLineSt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const messageQueue = {
    url: 'amqp://localhost',
    queueName: 'hello',
    sendMessage: (message) => {
        messageQueue.channel.sendToQueue(messageQueue.queueName, new Buffer(message))
    },
    readLine: () => {
        readLineSt.question('Send to message: ', (message) => {
            messageQueue.sendMessage(message);
            messageQueue.readLine();
        })
    }
};


amqp.connect(messageQueue.url, (error, connection) => {
    connection.createChannel((error, channel) => {
        messageQueue.channel = channel
        messageQueue.channel.assertQueue(messageQueue.queueName, {
            durable: false
        });
    });
});

messageQueue.readLine();