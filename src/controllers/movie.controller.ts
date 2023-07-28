import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { prisma } from "../prisma/client";
import { AppError } from "../erros/error";
import bcrypt from "bcryptjs"


export const allmovies = async (req:Request,res:Response) => {
    const total = req.query.itens
    const itens = parseInt(total as string)

    try {
        const totalMovies = await prisma.movie.count();

        if (itens) {
            const movies = await prisma.movie.findMany(
            {take: itens}
            );

            return res.status(200).json({data: movies, isLast: itens >= totalMovies});
        } else {
            const movies = await prisma.movie.findMany();
    
            return res.status(200).json({data: movies, isLast: itens >= totalMovies});
        }
      } catch (err: any) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

export const create = async (req:Request, res:Response) => {
    const { title, duration, release_Date, description, url_Image } = req.body;

    try {

        if (!title) res.status(400).json({error: 'The field "title" is empty'})
        if (!duration) res.status(400).json({error: 'The field "duration" is empty'})
        if (!description) res.status(400).json({error: 'The field "description" is empty'})
        if (!url_Image) res.status(400).json({error: 'The field "url_Image" is empty'})

        const movieAlreadyExists = await prisma.movie.findUnique({
            where:{
                title:title,
            }
        });

        if (movieAlreadyExists) res.status(409).json('Movie already exists! Please try again');
       
        const movie = await prisma.movie.create({
            data:{title, duration,release_Date,description, url_Image,},
        });

        return res.status(201).json({status:'created', data: movie});
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}