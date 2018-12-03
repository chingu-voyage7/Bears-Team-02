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
    name: "Post",
    embedded: false
  },
  {
    name: "PriceRange",
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
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SERVICE_SECRET"]}`
});
exports.prisma = new exports.Prisma();
