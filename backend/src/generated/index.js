"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "ContentType",
    embedded: false
  },
  {
    name: "Difficulty",
    embedded: false
  },
  {
    name: "Language",
    embedded: false
  },
  {
    name: "Library",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Review",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/the-source/the_source/dev`
});
exports.prisma = new exports.Prisma();
