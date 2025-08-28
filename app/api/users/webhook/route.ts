import { db } from "@/db";
import { users } from "@/db/schemas/usersSchema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

     if (eventType === "user.created") {
        const { id, first_name, last_name, image_url } = evt?.data ?? "";
        console.log(evt.data,'✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅');
        await db.insert(users).values({
          clerkId: id,
          name: `${first_name} ${last_name}`,
          imageUrl: image_url,
        });
      }

      if (eventType === "user.deleted") {
        const { id } = evt.data;

        if (!id) {
          return new Response("Missing user id", { status: 400 });
        }

        await db.delete(users).where(eq(users.clerkId, id));
      }

      if (eventType === "user.updated") {
        const { id, first_name, last_name, image_url } = evt.data;

        if (!id) {
          return new Response("Missing user id", { status: 400 });
        }

        await db
          .update(users)
          .set({
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
          })
          .where(eq(users.clerkId, id));
      }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
