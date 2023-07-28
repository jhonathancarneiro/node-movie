import { Request, Response, NextFunction } from "express"
import JWT from "jsonwebtoken"

type paylodJwt = {
    id: string
    email: string
}


export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    let sucess = false

    if (req.headers.authorization) {
      try {
        const [authType, token] = req.headers.authorization.split(" ")
        if (authType === "Bearer") {
          JWT.verify(token, 'test123', (err, decoded) => {
            if (err) res.status(403).json({ mensagem: 'Invalid token' });

            const myDecoded = decoded as paylodJwt

            req.body.id = myDecoded.id
          })

          sucess = true
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (sucess) {
        

      next()
    } else {
      res.status(403).json({ error: "Don't have permission" })
    }
}

