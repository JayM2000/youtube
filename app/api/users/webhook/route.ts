import { db } from "@/db";
import { users } from "@/db/schemas/usersSchema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
// export async function GET(req: NextRequest) {
//   try {
//     return new Response("Webhook received TEST GET call", { status: 200 });
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error verifying webhook", { status: 400 });
//   }
// }

// export async function GET(req: NextRequest) {
//   // Simple test response to confirm route is live
//   console.log("Webhook GET called");
//   return NextResponse.json(
//     { message: "Webhook endpoint is reachable" },
//     { status: 200 },
//   );
// }

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SECRET,
    });

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created") {
      const { id, first_name, last_name, image_url } = evt?.data ?? "";
      console.log(
        evt.data,
        "✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅",
      );
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
