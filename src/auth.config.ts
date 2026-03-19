
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bpcryptjs from 'bcryptjs';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },

    callbacks: {
        jwt( {token, user} ){

            if( user ){
                token.data = user;
            }

            return token;
        }, 

        session( { session, token } ) {
            session.user = token.data as never;
            return session;
        }
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                    // console.log(parsedCredentials.success);
                    if( !parsedCredentials.success ) return null;

                    const { email, password } = parsedCredentials.data;

                    // console.log('authConfig.ts')
                    // console.log({ email, password });

                // Buscar el correo
                const user = await prisma.user.findFirst( { where: { email: email.toLowerCase() } });

                if (! user ) return null;
                
                // Comparar las contrasñas

                if( !bpcryptjs.compareSync( password, user.password ) ){
                    
                    return null;
                }
                
                // Regresar el usuario sin el password 
                const { password: _, ...rest} = user;
    
                return rest;
            },
        }),
    ],
    trustHost: true, 
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers} = NextAuth( authConfig );