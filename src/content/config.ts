import { z, defineCollection } from 'astro:content'

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    stakeholder: z.string(),
    containsDemo: z.boolean().optional(),
    articleDate: z.string(),
    projectStart: z.date(),
    projectFinish: z.date(),
    tags: z.array(z.string()),
    description: z.string(),
    sourceCode: z.string(),
    prev: z.string().optional(),
    next: z.string().optional(),
  })
})

const blogs = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    prev: z.string().optional(),
    next: z.string().optional(),
  })
})

export const collections = { projects, blogs }