const amqp = require('amqplib');
const { rabbitMQUrl, queueName } = require('./config');

async function consumeMessages() {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  console.log(`🔁 Waiting for messages in "${queueName}". Press CTRL+C to exit.`);

  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      console.log("📩 Received:", content);
      channel.ack(msg);
    }
  });
}

consumeMessages().catch(console.error);
