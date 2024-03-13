// prisma-client and accelerate
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors';
import {signinInput, signupInput, createPostInput, updatePostInput} from '@/zod/validator';

// To deploy to cloudflare workers, runtime should be set to 'edge'
export const runtime = 'edge';

// Create the main Hono app
const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>().basePath('/api');

app.use('/*', cors());

// Signup route
app.post('/v1/signup', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success) {
        c.status(400);
        return c.json({error: "Invalid Input"})
    }
    try{
        const user = await prisma.user.create({
            data:{
                email: body.email,
                password: body.password,
                name: body.name,
                imageURL: body.imageURL,
            }
        });
        const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
        return c.json({jwt});
    }catch(e){
        c.status(403)
        return c.json({message: "Error while signing up"})
    }
})

//Sign-in route
app.post('/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "Invalid Input" });
	}
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "User Not Found" });
	}
    if (user.password !== body.password) {
        c.status(403);
        return c.json({ error: "Invalid Password" });
    }
	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})

// Adding Middleware for blog endpoint
app.use('/v1/blog/*', async(c, next)=>{
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});
// ----- Blog endpoints ------
// initialize a blog/post
app.post('/v1/blog',async (c)=>{
    const userId = c.get('userId');
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({error: "Invalid Input"});
    }
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(userId)
        }
    });
    return c.json({
        id: post.id
    })
})
//update blog
app.put('/v1/blog/:id', async (c)=>{
    const userId = c.get('userId');
    const id = c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "Invalid Input" });
	}
    await prisma.post.update({
        where: {
            id: Number(id),
            authorId: Number(userId)
        },
        data: {
            title: body.title,
            content: body.content
        }
    });
    return c.json({
        id: Number(id)

    })
})

// Route to fetch all blogs
app.get('/v1/blog/bulk', async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    try{
        const blogs = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name: true,
                        imageURL:true
                    }
                }
            }
        });
        return c.json({
            blogs
        });
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog posts"
        })
    }
})
//endpoint to fetch all blogs by a user
app.get('/v1/blog/user', async (c)=>{
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs = await prisma.post.findMany({
            where:{
                authorId: Number(userId)
            },
            select:{
                content:true,
                title:true,
                id:true,
            }
        });
        const user = await prisma.user.findUnique({
            where:{
                id:Number(userId)
            },
            select:{
                name:true,
                imageURL:true,
            }
        })
        return c.json({
            blogs, user
        });
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog posts"
        })
    }
})

//Get the blog by ID
app.get('/v1/blog/:id', async(c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findUnique({
            where:{
                id:Number(id)
            },
            select:{
                id:true,
                title:true,
                content: true,
                author:{
                    select:{
                        name:true,
                        imageURL:true
                    }
                }
            }
        });
        return c.json({
            blog
        });
    }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        })
    }

})



//Delete a blog
app.delete('/v1/blog/:id', async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    const id = c.req.param('id');
    await prisma.post.delete({
        where:{
            id:Number(id)
        }
    });
    return c.text("Post Deleted")
})


export default app as never

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
