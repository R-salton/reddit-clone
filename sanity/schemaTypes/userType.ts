import { UserIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: UserIcon,
  preview: {
    select: {
        title: 'username',
        subtitle: 'email',
        media: 'imageUrl'
    },
},
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: Rule => Rule.required().error("Username is required"),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().required().error("Email is required"),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image Url',
      type: 'strinn',
     description: "user Profile picture",
    }),
    defineField({
      name: 'joinedAt',
      title: 'Joined At',
      type: 'datetime',
      description: "When user joined the platform",
      initialValue: () => Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isReported',
      title: 'Is Reported',
      type: 'string',
      description: "Indicates that this user has been reported",
      option: {
        list : [
            {title: "No", balue: "yes" },
            {title: "Yes", balue: "yes" },
        ],
        layout: "radio",
      }
      initialValue: "no",
    })
  ],
  
})
