import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
import { User } from "./User";

export const Pin = objectType({
    name: "Pin",
    definition(t) {
        t.string("id");
        t.string("createdAt");
        t.string("updatedAt");
        t.string("title");
        t.string("description");
        t.string("status");
        t.string("userId");
        t.list.field("users", {
            type: User,
            async resolve(parent, _args, context) {
                return await context.prisma.pin
                    .findUnique({
                        where: {
                            id: parent.id,
                        },
                    })
                    .users();
            },
        });
    },
});

export const PinsQuery = extendType({
    type: "Query",
    definition(t) {
        // get all pins
        t.nonNull.list.field("pins", {
            type: "Pin",
            resolve(_parent, _args, ctx) {
                return ctx.prisma.pin.findMany();
            },
        });
        // get pin by user id
        t.field("pin", {
            type: "Pin",
            args: {
                userId: nonNull(stringArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.pin.findMany({
                    where: {
                        userId: args.userId,
                    },
                });
            },
        });
    },
});

export const PinMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createPin", {
            type: "Pin",
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                userId: stringArg(),
                id: stringArg(),
                status: stringArg(),
            },
            resolve(parent, args, context) {
                console.log(context.prisma.pin);
                return context.prisma.pin.create({
                    data: {
                        title: args.title,
                        description: args.description,
                        userId: args.userId,
                        id: args.id,
                        image: "",
                        status: args.status,
                    },
                });
            },
        });
        t.field("updatePin", {
            type: "Pin",
            args: {
                id: nonNull(stringArg()),
                title: stringArg(),
                description: stringArg(),
                userId: stringArg(),
                status: stringArg(),
            },
            resolve(parent, args, context) {
                return context.prisma.pin.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        title: args.title,
                        description: args.description,
                        userId: args.userId,
                        status: args.status,
                    },
                });
            },
        });
        t.field("deletePin", {
            type: "Pin",
            args: {
                id: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                return context.prisma.pin.delete({
                    where: {
                        id: args.id,
                    },
                });
            },
        });
    },
});
