import { query, mutation } from "./_generated/server";

export const getViews = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("stats").first();
    return stats?.views ?? 0;
  },
});

export const incrementViews = mutation({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("stats").first();

    if (stats) {
      await ctx.db.patch(stats._id, {
        views: stats.views + 1,
      });
      return stats.views + 1;
    } else {
      // If no stats document exists, create one starting at 2149
      await ctx.db.insert("stats", { views: 2149 });
      return 2149;
    }
  },
});
