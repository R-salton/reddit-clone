import { type SchemaTypeDefinition } from 'sanity'
import { userType } from './userType'
import { commentType } from './commentType'
import { postType } from './postType'
import { voteType } from './voteType'
import { subredditType } from './subredditType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType,commentType,postType,voteType,subredditType],
}
