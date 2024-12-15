// pnpm dlx prisma db push
// npx tsx prisma\seeders\post.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const posts = [
		{
			title: "Getting Started with Next.js",
			body: "Next.js is a powerful React framework that makes building full-stack web applications simple and efficient...",
		},
		{
			title: "Understanding Prisma",
			body: "Prisma is a next-generation ORM that helps developers build faster and make fewer errors...",
		},
		{
			title: "The Power of TypeScript",
			body: "TypeScript adds static typing to JavaScript, enabling better tooling and a more robust development experience...",
		},
		{
			title: "Modern CSS Techniques",
			body: "Exploring advanced CSS features like Grid, Flexbox, and Custom Properties that are revolutionizing web layouts...",
		},
		{
			title: "React Best Practices",
			body: "Learn essential patterns and practices for building maintainable and performant React applications...",
		},
		{
			title: "API Design Principles",
			body: "Understanding RESTful API design principles and best practices for building scalable web services...",
		},
		{
			title: "State Management in React",
			body: "Comparing different state management solutions in React, from Context API to Redux and Zustand...",
		},
		{
			title: "Web Performance Optimization",
			body: "Techniques and strategies for improving website performance, loading times, and user experience...",
		},
		{
			title: "Testing React Applications",
			body: "Comprehensive guide to testing React applications using Jest, React Testing Library, and Cypress...",
		},
		{
			title: "Authentication Strategies",
			body: "Implementing secure authentication and authorization in modern web applications using industry best practices...",
		},
	];

	for (const post of posts) {
		try {
			const result = await prisma.post.create({
				data: post,
			});
			console.log(`Seeded post: ${post.title}`);
		} catch (error) {
			console.error(`Error seeding ${post.title}:`, error);
		}
	}

	console.log("Posts seeded successfully!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
