import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/projects' }),
  schema: z.object({
    order: z.number(),
    imageUrl: z.string(),
    role: z.enum(['Frontend', 'Backend', 'Fullstack']),
    title: z.string(),
    description: z.string(),
    technologies: z.array(
      z.enum([
        'Angular',
        'Express.js',
        'NgRx',
        'Tailwind',
        'Sequelize',
        'React',
        'Material UI',
        'Next.js',
        'Vue.js',
        'Astro',
        'Prisma',
        'Tauri',
      ]),
    ),
  }),
});

export const experiences = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/experiences' }),
  schema: z.object({
    order: z.number(),
    date: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    description: z.string(),
    subtitle: z.string().optional(),
    technologies: z.array(z.string()).optional(),
  }),
});

export const profile = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/profile' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    email: z.string(),
    website: z.string(),
    phone: z.string(),
    summary: z.string(),
  }),
});

export const education = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/education' }),
  schema: z.object({
    order: z.number(),
    institution: z.string(),
    location: z.string(),
    degrees: z.array(
      z.object({
        title: z.string(),
        period: z.string(),
      }),
    ),
  }),
});

export const skills = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/skills' }),
  schema: z.object({
    order: z.number(),
    category: z.string(),
    items: z.array(z.string()),
  }),
});

export const languages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/languages' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    level: z.string(),
    certifications: z
      .array(
        z.object({
          label: z.string(),
          credential: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = {
  projects,
  experiences,
  profile,
  education,
  skills,
  languages,
};
