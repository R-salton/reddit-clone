import { defineField, defineType } from 'sanity'
import {FileTextIcon} from 'lucide-react'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: FileTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(300),
    }),
    defineField({
      name: 'originalTitle',
      title: 'Original Title',
      type: 'string',
      description: "The original title of the post, if deleted",
      hidden: true,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required().error("Author is required"),
    }),
    defineField({
      name: 'subReddit',
      title: 'Subreddit',
      type: 'reference',
      description: "The subreddit the post belongs to",
      to: [{ type: 'subreddit' }],
      validation: Rule => Rule.required().error("SubReddit is required"),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: "The content of the post",
      of: [{ type: 'block' }],
    
    }),
    defineField({
      name: 'originalBody',
      title: 'Original Body',
      type: 'array',
      description: "The original content of the post, if deleted",
      of: [{ type: 'block' }],
      hidden: true,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: "An optional image associated with the post",
      fields:[
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: "The alt text of the image",
        }),
      ],
    }),
    defineField({
        name: "originalImage",
        title: "Original Image",
        type: "image",
        description: "The original image of the post, if deleted",
        fields:[
          defineField({
            name: 'alt',
            title: 'Alt',
            type: 'string',
            description: "The alt text of the image",
          }),
        ],
        hidden: true,
    }),
    
    defineField({
      name: 'isReported',
      title: 'Is Reported',
      type: 'boolean',
      description: "Indicates if the post has been reported",
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: "The date and time the post was published",
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required().error("Published date is required"),
    }),
    defineField({
      name: 'isDeleted',
      title: 'Is Deleted',
      type: 'boolean',
      description: "Indicates if the post has been deleted",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.username',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})