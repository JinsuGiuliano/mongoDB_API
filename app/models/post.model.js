const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, "A Post must have a caption"],
    },
    createdBy: {
      type: String,
      required: [true, "A Post must be created by someone"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    file: {
      type: String,
      default: "",
    },
    downloadUrl: {
      type: String,
      default: "",
    },
    likesCount: Number,
    readed: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostSchema.virtual("timeSincePosted").get(function () {
  return Date.now() - this.createdAt;
});

PostSchema.pre("save", function () {
  console.log("pre-save: ", this);
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
