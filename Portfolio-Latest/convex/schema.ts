import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stats: defineTable({
    views: v.number(),
  }),
});
