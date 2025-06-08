require('dotenv').config();

module.exports = {
  rabbitMQUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
  queueName: process.env.QUEUE_NAME || 'defaultQueue',
};
