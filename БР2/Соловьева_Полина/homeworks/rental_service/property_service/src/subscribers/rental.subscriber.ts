import { consumeQueue } from "../config/rabbit";
import { propertyRepository } from "../repositories/property.repository";

consumeQueue("rental_events", async (msg) => {
  if (msg.type === "rental_created") {
    const { propertyId, startDate, endDate } = msg.payload;

    await propertyRepository.update({ id: propertyId }, {
      available_from: endDate,
    });

    console.log(`✅ Property ${propertyId} marked as busy until ${endDate}`);
  }
});

