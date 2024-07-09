import bcryptjs from 'bcryptjs'
import NextAuth, { User, type NextAuthConfig } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import prisma from './lib/prisma'
import { signInSchema } from './lib/zod'

type SessionUser = AdapterUser & {
  id: string
  name: string
  email: string
  emailVerified: boolean
  role: string
  image: string
} & User

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnProtected = nextUrl.pathname.startsWith('/checkout')

      if (isOnProtected) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      // else if (isLoggedIn) {
      //   return Response.redirect(new URL('/', nextUrl))
      // }
      return true
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user
      }

      return token
    },
    session({ session, token }) {
      session.user = token.data as SessionUser

      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials)

        // //   buscar correo
        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } })

        if (!user) return null

        // // comparar contraseñas

        if (!bcryptjs.compareSync(password, user.password)) return null

        // //regresar el usuario

        const { password: _, ...rest } = user

        return rest
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
