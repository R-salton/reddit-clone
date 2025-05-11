import { MessageSquareIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: MessageSquareIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: "The content of the comment",
      validation: Rule => Rule.required().error("Content is required"),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
      description: "The user who wrote the comment",
      validation: Rule => Rule.required().error("Author is required"),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      description: "The post this comment belongs to for nested comments",
      validation: Rule => Rule.required().error("Post is required"),
    }),
 
    defineField({
      name: 'parentComment',
      title: 'Parent Comment',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: "The parent comment if this is a reply",
    }),
    defineField({
      name: 'isReported',
      title: 'Is Reported',
      type: 'boolean',
      description: "Indicates whether the comment has been reported",
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      description: "The date and time when the comment was created",
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required().error("Creation date is required"),
    }),
    defineField({
      name: 'isDeleted',
      title: 'Is Deleted',
      type: 'boolean',
      description: "Indicates whether the comment has been deleted",
      initialValue: false,
    }),
  ],
  preview:{
    select: {
      title: 'content', 
      subtitle: 'author.username',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    }
  }
})