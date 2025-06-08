const amqp = require('amqplib');
const { rabbitMQUrl, queueName } = require('./config');

async function produceMessage() {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  const message = { text: "Hello World", timestamp: new Date() };
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

  console.log("✅ Message sent:", message);
  await channel.close();
  await connection.close();
}

produceMessage().catch(console.error);
