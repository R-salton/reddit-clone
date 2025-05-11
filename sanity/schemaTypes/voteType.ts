import {ArrowDown,ArrowUp} from "lucide-react";
import { defineField, defineType } from "sanity";

export const voteType = defineType({
  name: "vote",
  title: "Vote",
  type: "document",
  icon: ArrowUp,
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      description: "The user who cast the vote",
      validation: Rule => Rule.required().error("User is required"),
    }),
    defineField({
      name: "voteType",
      title: "Vote Type",
      type: "string",
      description: "The type of vote (upvote or downvote)",
      options: {
        list: [
          { title: "Upvote", value: "upvote" },
          { title: "Downvote", value: "downvote" },
        ],
        layout: "radio",
      },
      validation: Rule => Rule.required().error("Vote type is required"),
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      description: "The post this vote is associated with",
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "reference",
      to: [{ type: "comment" }],
      description: "The comment this vote is associated with (if applicable)",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "The date and time when the vote was cast",
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required().error("Creation date is required"),
    }),
  ],
  preview: {
    select: {

        voteType: "voteType",
        postTitle: "post.title",
        commentTitle: "comment.content",
        username: "user.username",
    },
    prepare(selection) {
        const {voteType, postTitle, commentTitle,username} = selection;
      return {
        title: postTitle || commentTitle,
        subtitle: username,
        media: voteType === "upvote" ? ArrowUp : ArrowDown,
      };
    },
  },
  validation: (rule) => 
    rule.custom((fields) => {
        if (fields?.post && fields?.comment) { 
            return "You cannot vote on both a post and a comment at the same time";
        }
        if (!fields?.post && !fields?.comment) { 
            return "You must vote on either a post or a comment";
        }
        return true;
    })
});