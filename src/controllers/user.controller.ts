import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { prisma } from "../prisma/client";
import { AppError } from "../erros/error";
import bcrypt from "bcryptjs"

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {

        if (!name) res.status(400).json({ error: 'The field "name" is empty'})

        if (!email) res.status(400).json({error: 'The field "email" is empty'})

        if (!password) res.status(400).json({ error: 'The field "password" is empty'})

        const userAlreadyExists = await prisma.user.findUnique({
            where:{
                email
            }
        });
    
        if (userAlreadyExists) res.status(409).json({ error: 'User already exists! Please try again'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{name,email,password:hashedPassword,},
        });

        return res.status(201).json({status: 'sucess', message: 'The user was created'});
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {

        if (!email) res.status(400).json({error: 'The field "email" is empty'})

        if (!password) res.status(400).json({error: 'The field "password" is empty'})

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        });

        if (user){
            bcrypt.compare(password, user?.password, (err, result) => {

                if (err) res.status(500).json({error: 'error comparing password'})

                if (result) {
                    const token = JWT.sign(
                        { id: user?.id, email: user?.email },
                        'test123'
                    )
            
                    return res.status(200).json({ status: 'logged', token })
                } else {
                    return res.status(400).json({ error: 'The password is wrong! Please try again'});
                }
            })
        } else {
            return res.status(404).json({ error: 'The user does not exist! Please try again'});
        }

    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export const user = async (req: Request, res: Response) => {
    const { id } = req.body

    try {
    
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        });

        return res.status(200).json(user)

    }  catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}