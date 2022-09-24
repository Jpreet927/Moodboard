import { enumType, objectType, nonNull, extendType, stringArg } from "nexus";
import { Pin } from "./Pin";

export const User = objectType({
    name: "User",
    definition(t) {
        t.string("id");
        t.string("name");
        t.string("email");
        t.string("avatar");
        t.field("role", { type: Role });
        t.list.field("tasks", {
            type: Pin,
            async resolve(parent, args, context) {
                return await context.prisma.user
                    .findUnique({
                        where: {
                            id: parent.id,
                        },
                    })
                    .pins();
            },
        });
    },
});

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("users", {
            type: "User",
            resolve(_parent, _args, context) {
                return context.prisma.user.findMany();
            },
        });
        t.field("user", {
            type: "User",
            args: {
                email: nonNull(stringArg()),
            },
            resolve(_parent, args, context) {
                return context.prisma.user.findUnique({
                    where: {
                        email: args.email,
                    },
                });
            },
        });
    },
});

const Role = enumType({
    name: "Role",
    members: ["FREE", "SUBSCRIBER"],
});
