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
  }),
});

export const collections = {
  projects,
  experiences,
};
