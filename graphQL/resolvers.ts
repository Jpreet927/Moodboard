import prisma from "../lib/prisma";

export const resolvers = {
    Query: {
        pins: async (_parent, args, context) =>
            await context.prisma.pin.findMany(),
    },
};
