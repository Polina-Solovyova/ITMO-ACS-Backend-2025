import amqp from "amqplib";

let channel: amqp.Channel | null = null;

/**
 * Подключение к RabbitMQ
 */
export async function connectRabbitMQ(): Promise<amqp.Channel> {
  if (channel) {
    return channel;
  }

  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://user:password@rabbitmq:5672");
    channel = await connection.createChannel();

    console.log("✅ Connected to RabbitMQ");

    return channel;
  } catch (error) {
    console.error("❌ Failed to connect to RabbitMQ:", error);
    throw error;
  }
}

/**
 * Отправка сообщения в очередь
 */
export async function publishToQueue(queueName: string, message: any) {
  const ch = await connectRabbitMQ();

  await ch.assertQueue(queueName, { durable: true });
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });

  console.log(`📤 Sent message to queue [${queueName}]:`, message);
}

/**
 * Подписка на очередь
 */
export async function consumeQueue(queueName: string, callback: (msg: any) => void) {
  const ch = await connectRabbitMQ();

  await ch.assertQueue(queueName, { durable: true });

  ch.consume(queueName, (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      console.log(`📥 Received message from queue [${queueName}]:`, content);

      callback(content);

      ch.ack(msg);
    }
  });

  console.log(`👂 Subscribed to queue [${queueName}]`);
}
