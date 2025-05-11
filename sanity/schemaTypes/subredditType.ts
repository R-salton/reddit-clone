import { TagIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'


export const subredditType = defineType({
  name: 'subreddit',
  title: 'Subreddit',
  type: 'document',
  icon: TagIcon,
  description: "A subreddit is a community of users who share content related to a specific topic",
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "The name of the subreddit",
      validation: Rule => Rule.required().error("Title is required"),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: "A brief description of the subreddit",
      validation: Rule => Rule.required().error("Description is required"),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "A unique identifier for the subreddit, used in URLs",
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: "An optional image representing the subreddit",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'moderator',
      title: 'Moderator',
      type: 'reference',
      to: [{ type: 'user' }],
      description: "The user who moderates the subreddit",
      validation: Rule => Rule.required().error("Moderator is required"),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: "The date and time when the subreddit was created",
      validation: Rule => Rule.required().error("Creation date is required"),
    }),
  ],
    preview: {
        select: {
        title: 'title',
        media: 'image',
        },
    },
})