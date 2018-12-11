module.exports = {
        typeDefs: /* GraphQL */ `type AggregatePost {
  count: Int!
}

type AggregateReview {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum ContentType {
  DOCUMENTATION
  TUTORIAL
  BOOK
  ARTICLE
  ACADEMY
}

scalar DateTime

enum Difficulty {
  EASY
  MID
  HARD
  EXPERT
}

enum Language {
  ALL
  AWS
  CSS
  CLI
  CSHARP
  DATABASE
  GIT
  HTML
  JAVA
  JAVASCRIPT
  LINUX
  MARKDOWN
  PYTHON
  RUBY
}

scalar Long

type Mutation {
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createReview(data: ReviewCreateInput!): Review!
  updateReview(data: ReviewUpdateInput!, where: ReviewWhereUniqueInput!): Review
  updateManyReviews(data: ReviewUpdateManyMutationInput!, where: ReviewWhereInput): BatchPayload!
  upsertReview(where: ReviewWhereUniqueInput!, create: ReviewCreateInput!, update: ReviewUpdateInput!): Review!
  deleteReview(where: ReviewWhereUniqueInput!): Review
  deleteManyReviews(where: ReviewWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  language: Language!
  tags: [String!]!
  contentType: ContentType!
  difficulty: Difficulty!
  title: String!
  description: String!
  author: String!
  href: String!
  image: String
  price: PriceRange!
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
  user: User!
  createdAt: DateTime!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  language: Language!
  tags: PostCreatetagsInput
  contentType: ContentType!
  difficulty: Difficulty!
  title: String!
  description: String!
  author: String!
  href: String!
  image: String
  price: PriceRange!
  reviews: ReviewCreateManyWithoutPostInput
  user: UserCreateOneWithoutPostsInput!
}

input PostCreateManyWithoutUserInput {
  create: [PostCreateWithoutUserInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateOneWithoutReviewsInput {
  create: PostCreateWithoutReviewsInput
  connect: PostWhereUniqueInput
}

input PostCreatetagsInput {
  set: [String!]
}

input PostCreateWithoutReviewsInput {
  language: Language!
  tags: PostCreatetagsInput
  contentType: ContentType!
  difficulty: Difficulty!
  title: String!
  description: String!
  author: String!
  href: String!
  image: String
  price: PriceRange!
  user: UserCreateOneWithoutPostsInput!
}

input PostCreateWithoutUserInput {
  language: Language!
  tags: PostCreatetagsInput
  contentType: ContentType!
  difficulty: Difficulty!
  title: String!
  description: String!
  author: String!
  href: String!
  image: String
  price: PriceRange!
  reviews: ReviewCreateManyWithoutPostInput
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  language_ASC
  language_DESC
  contentType_ASC
  contentType_DESC
  difficulty_ASC
  difficulty_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  author_ASC
  author_DESC
  href_ASC
  href_DESC
  image_ASC
  image_DESC
  price_ASC
  price_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PostPreviousValues {
  id: ID!
  language: Language!
  tags: [String!]!
  contentType: ContentType!
  difficulty: Difficulty!
  title: String!
  description: String!
  author: String!
  href: String!
  image: String
  price: PriceRange!
  createdAt: DateTime!
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  language: Language
  language_not: Language
  language_in: [Language!]
  language_not_in: [Language!]
  contentType: ContentType
  contentType_not: ContentType
  contentType_in: [ContentType!]
  contentType_not_in: [ContentType!]
  difficulty: Difficulty
  difficulty_not: Difficulty
  difficulty_in: [Difficulty!]
  difficulty_not_in: [Difficulty!]
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  author: String
  author_not: String
  author_in: [String!]
  author_not_in: [String!]
  author_lt: String
  author_lte: String
  author_gt: String
  author_gte: String
  author_contains: String
  author_not_contains: String
  author_starts_with: String
  author_not_starts_with: String
  author_ends_with: String
  author_not_ends_with: String
  href: String
  href_not: String
  href_in: [String!]
  href_not_in: [String!]
  href_lt: String
  href_lte: String
  href_gt: String
  href_gte: String
  href_contains: String
  href_not_contains: String
  href_starts_with: String
  href_not_starts_with: String
  href_ends_with: String
  href_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  price: PriceRange
  price_not: PriceRange
  price_in: [PriceRange!]
  price_not_in: [PriceRange!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  language: Language
  tags: PostUpdatetagsInput
  contentType: ContentType
  difficulty: Difficulty
  title: String
  description: String
  author: String
  href: String
  image: String
  price: PriceRange
  reviews: ReviewUpdateManyWithoutPostInput
  user: UserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateManyDataInput {
  language: Language
  tags: PostUpdatetagsInput
  contentType: ContentType
  difficulty: Difficulty
  title: String
  description: String
  author: String
  href: String
  image: String
  price: PriceRange
}

input PostUpdateManyMutationInput {
  language: Language
  tags: PostUpdatetagsInput
  contentType: ContentType
  difficulty: Difficulty
  title: String
  description: String
  author: String
  href: String
  image: String
  price: PriceRange
}

input PostUpdateManyWithoutUserInput {
  create: [PostCreateWithoutUserInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateOneRequiredWithoutReviewsInput {
  create: PostCreateWithoutReviewsInput
  update: PostUpdateWithoutReviewsDataInput
  upsert: PostUpsertWithoutReviewsInput
  connect: PostWhereUniqueInput
}

input PostUpdatetagsInput {
  set: [String!]
}

input PostUpdateWithoutReviewsDataInput {
  language: Language
  tags: PostUpdatetagsInput
  contentType: ContentType
  difficulty: Difficulty
  title: String
  description: String
  author: String
  href: String
  image: String
  price: PriceRange
  user: UserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateWithoutUserDataInput {
  language: Language
  tags: PostUpdatetagsInput
  contentType: ContentType
  difficulty: Difficulty
  title: String
  description: String
  author: String
  href: String
  image: String
  price: PriceRange
  reviews: ReviewUpdateManyWithoutPostInput
}

input PostUpdateWithWhereUniqueWithoutUserInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutUserDataInput!
}

input PostUpsertWithoutReviewsInput {
  update: PostUpdateWithoutReviewsDataInput!
  create: PostCreateWithoutReviewsInput!
}

input PostUpsertWithWhereUniqueWithoutUserInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutUserDataInput!
  create: PostCreateWithoutUserInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  language: Language
  language_not: Language
  language_in: [Language!]
  language_not_in: [Language!]
  contentType: ContentType
  contentType_not: ContentType
  contentType_in: [ContentType!]
  contentType_not_in: [ContentType!]
  difficulty: Difficulty
  difficulty_not: Difficulty
  difficulty_in: [Difficulty!]
  difficulty_not_in: [Difficulty!]
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  author: String
  author_not: String
  author_in: [String!]
  author_not_in: [String!]
  author_lt: String
  author_lte: String
  author_gt: String
  author_gte: String
  author_contains: String
  author_not_contains: String
  author_starts_with: String
  author_not_starts_with: String
  author_ends_with: String
  author_not_ends_with: String
  href: String
  href_not: String
  href_in: [String!]
  href_not_in: [String!]
  href_lt: String
  href_lte: String
  href_gt: String
  href_gte: String
  href_contains: String
  href_not_contains: String
  href_starts_with: String
  href_not_starts_with: String
  href_ends_with: String
  href_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  price: PriceRange
  price_not: PriceRange
  price_in: [PriceRange!]
  price_not_in: [PriceRange!]
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

enum PriceRange {
  FREE
  LOW
  MID
  HIGH
}

type Query {
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  review(where: ReviewWhereUniqueInput!): Review
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review]!
  reviewsConnection(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReviewConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Review {
  id: ID!
  rating: Int!
  text: String
  user: User!
  post: Post!
  createdAt: DateTime!
}

type ReviewConnection {
  pageInfo: PageInfo!
  edges: [ReviewEdge]!
  aggregate: AggregateReview!
}

input ReviewCreateInput {
  rating: Int!
  text: String
  user: UserCreateOneWithoutReviewsInput!
  post: PostCreateOneWithoutReviewsInput!
}

input ReviewCreateManyWithoutPostInput {
  create: [ReviewCreateWithoutPostInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateManyWithoutUserInput {
  create: [ReviewCreateWithoutUserInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateWithoutPostInput {
  rating: Int!
  text: String
  user: UserCreateOneWithoutReviewsInput!
}

input ReviewCreateWithoutUserInput {
  rating: Int!
  text: String
  post: PostCreateOneWithoutReviewsInput!
}

type ReviewEdge {
  node: Review!
  cursor: String!
}

enum ReviewOrderByInput {
  id_ASC
  id_DESC
  rating_ASC
  rating_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ReviewPreviousValues {
  id: ID!
  rating: Int!
  text: String
  createdAt: DateTime!
}

input ReviewScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  rating: Int
  rating_not: Int
  rating_in: [Int!]
  rating_not_in: [Int!]
  rating_lt: Int
  rating_lte: Int
  rating_gt: Int
  rating_gte: Int
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReviewScalarWhereInput!]
  OR: [ReviewScalarWhereInput!]
  NOT: [ReviewScalarWhereInput!]
}

type ReviewSubscriptionPayload {
  mutation: MutationType!
  node: Review
  updatedFields: [String!]
  previousValues: ReviewPreviousValues
}

input ReviewSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ReviewWhereInput
  AND: [ReviewSubscriptionWhereInput!]
  OR: [ReviewSubscriptionWhereInput!]
  NOT: [ReviewSubscriptionWhereInput!]
}

input ReviewUpdateInput {
  rating: Int
  text: String
  user: UserUpdateOneRequiredWithoutReviewsInput
  post: PostUpdateOneRequiredWithoutReviewsInput
}

input ReviewUpdateManyDataInput {
  rating: Int
  text: String
}

input ReviewUpdateManyMutationInput {
  rating: Int
  text: String
}

input ReviewUpdateManyWithoutPostInput {
  create: [ReviewCreateWithoutPostInput!]
  delete: [ReviewWhereUniqueInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutPostInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutPostInput!]
  deleteMany: [ReviewScalarWhereInput!]
  updateMany: [ReviewUpdateManyWithWhereNestedInput!]
}

input ReviewUpdateManyWithoutUserInput {
  create: [ReviewCreateWithoutUserInput!]
  delete: [ReviewWhereUniqueInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ReviewScalarWhereInput!]
  updateMany: [ReviewUpdateManyWithWhereNestedInput!]
}

input ReviewUpdateManyWithWhereNestedInput {
  where: ReviewScalarWhereInput!
  data: ReviewUpdateManyDataInput!
}

input ReviewUpdateWithoutPostDataInput {
  rating: Int
  text: String
  user: UserUpdateOneRequiredWithoutReviewsInput
}

input ReviewUpdateWithoutUserDataInput {
  rating: Int
  text: String
  post: PostUpdateOneRequiredWithoutReviewsInput
}

input ReviewUpdateWithWhereUniqueWithoutPostInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutPostDataInput!
}

input ReviewUpdateWithWhereUniqueWithoutUserInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutUserDataInput!
}

input ReviewUpsertWithWhereUniqueWithoutPostInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutPostDataInput!
  create: ReviewCreateWithoutPostInput!
}

input ReviewUpsertWithWhereUniqueWithoutUserInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutUserDataInput!
  create: ReviewCreateWithoutUserInput!
}

input ReviewWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  rating: Int
  rating_not: Int
  rating_in: [Int!]
  rating_not_in: [Int!]
  rating_lt: Int
  rating_lte: Int
  rating_gt: Int
  rating_gte: Int
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  user: UserWhereInput
  post: PostWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReviewWhereInput!]
  OR: [ReviewWhereInput!]
  NOT: [ReviewWhereInput!]
}

input ReviewWhereUniqueInput {
  id: ID
}

enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  review(where: ReviewSubscriptionWhereInput): ReviewSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  image: String
  password: String
  oauthId: String
  role: Role!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
  createdAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  image: String
  password: String
  oauthId: String
  role: Role
  posts: PostCreateManyWithoutUserInput
  reviews: ReviewCreateManyWithoutUserInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutReviewsInput {
  create: UserCreateWithoutReviewsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPostsInput {
  name: String!
  email: String!
  image: String
  password: String
  oauthId: String
  role: Role
  reviews: ReviewCreateManyWithoutUserInput
}

input UserCreateWithoutReviewsInput {
  name: String!
  email: String!
  image: String
  password: String
  oauthId: String
  role: Role
  posts: PostCreateManyWithoutUserInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  image_ASC
  image_DESC
  password_ASC
  password_DESC
  oauthId_ASC
  oauthId_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  image: String
  password: String
  oauthId: String
  role: Role!
  createdAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  image: String
  password: String
  oauthId: String
  role: Role
  posts: PostUpdateManyWithoutUserInput
  reviews: ReviewUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  image: String
  password: String
  oauthId: String
  role: Role
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutReviewsInput {
  create: UserCreateWithoutReviewsInput
  update: UserUpdateWithoutReviewsDataInput
  upsert: UserUpsertWithoutReviewsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutPostsDataInput {
  name: String
  email: String
  image: String
  password: String
  oauthId: String
  role: Role
  reviews: ReviewUpdateManyWithoutUserInput
}

input UserUpdateWithoutReviewsDataInput {
  name: String
  email: String
  image: String
  password: String
  oauthId: String
  role: Role
  posts: PostUpdateManyWithoutUserInput
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserUpsertWithoutReviewsInput {
  update: UserUpdateWithoutReviewsDataInput!
  create: UserCreateWithoutReviewsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  oauthId: String
  oauthId_not: String
  oauthId_in: [String!]
  oauthId_not_in: [String!]
  oauthId_lt: String
  oauthId_lte: String
  oauthId_gt: String
  oauthId_gte: String
  oauthId_contains: String
  oauthId_not_contains: String
  oauthId_starts_with: String
  oauthId_not_starts_with: String
  oauthId_ends_with: String
  oauthId_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    