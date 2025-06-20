import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    async signin({ user, account }) {
      if (account.provider === "google") {
        const { name, email, role, image } = user;

        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              role,
              image,
            }),
          });
          const data = await res.json();

          if (res.ok) {
            user.mongoId = data.data._id;
            user.role = data.data.role;
            return user;
          }
        } catch (error) {
          console.error("Sign-in error:", error);
          return false;
        }
      }
      return null;
    },
    async jwt({ token, user }) {
      if (user) {
        token.mongoId = user.mongoId ?? null;
        token.role = user.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
        console.log("Session callback called with:", session, token);
      if (session?.user) {
        session.user.mongoId = token.mongoId ?? null;
        session.user.role = token.role ?? "user";
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
