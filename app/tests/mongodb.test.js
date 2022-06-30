const { MongoClient } = require("mongodb");
const dbConfig = require("../../app/config/db.config");
const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("Giuliano_db");
  });

  afterAll(async () => {
    await db.collection("followings").deleteOne({ userId: "some-user-id" });
    await db.collection("followers").deleteOne({ userId: "some-user-id" });
    await db.collection("followings").deleteOne({ userId: "some-user-id-2" });
    await db.collection("followers").deleteOne({ userId: "some-user-id-2" });
    await db.collection("users").deleteOne({ _id: "some-user-id" });
    await db.collection("users").deleteOne({ _id: "some-user-id-2" });
    await connection.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");
    const followers = db.collection("followers");
    const following = db.collection("followings");
    const mockUser = {
      _id: "some-user-id",
      username: "John",
      google: { id: "some-user-id", email: "some2@mail.com" },
    };
    await setUpUsers(users, followers, following);
    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });

  it("should update user", async () => {
    const users = db.collection("users");

    const mockUser = {
      _id: "some-user-id",
      username: "John",
      google: { id: "some-user-id", email: "some2@mail.com" },
    };
    await users.updateOne({ _id: "some-user-id" }, { $set: { ...mockUser } });

    const updatedUser = await users.findOne({ _id: "some-user-id" });

    expect(updatedUser).toEqual(mockUser);
  });

  it("should follow user", async () => {
    const users = db.collection("users");
    const followers = db.collection("followers");
    const following = db.collection("following");

    await users.updateOne({ _id: "some-user-id" }, { $inc: { following: 1 } });
    await users.updateOne(
      { _id: "some-user-id-2" },
      { $inc: { followers: 1 } }
    );
    await followers.updateOne(
      { userId: "some-user-id-2" },
      { $push: { followers: "some-user-id" } }
    );
    await following.updateOne(
      { userId: "some-user-id" },
      { $push: { following: "some-user-id-2" } }
    );

    const updatedUser = await users.findOne({ _id: "some-user-id" });
    const updatefollowing = await following.findOne({
      userId: "some-user-id",
    });

    expect({ ...updatefollowing }).toEqual(
      expect.objectContaining({
        following: ["some-user-id-2"],
      })
    );
  });
});

const setUpUsers = async function (users, followers, following) {
  const mockUser = {
    _id: "some-user-id",
    username: "John",
    google: { id: "some-user-id", email: "some2@mail.com" },
  };
  const mockUser2 = {
    _id: "some-user-id-2",
    username: "John2",
    google: { id: "some-user-id-2", email: "some@mail.com" },
  };
  const mockFollower = { userId: "some-user-id-2", followers: [] };
  const mockFollowing = { userId: "some-user-id", following: [] };
  await users.insertOne(mockUser);
  await users.insertOne(mockUser2);
  await followers.insertOne({ ...mockFollower, userId: "some-user-id-2" });
  await followers.insertOne({ ...mockFollower, userId: "some-user-id" });
  await following.insertOne({ ...mockFollowing, userId: "some-user-id-2" });
  await following.insertOne({ ...mockFollowing, userId: "some-user-id" });
};
