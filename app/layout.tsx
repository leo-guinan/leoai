import {Toaster} from 'react-hot-toast'
import {GeistSans} from 'geist/font/sans'
import {GeistMono} from 'geist/font/mono'

import '@/app/globals.css'
import {cn} from '@/lib/utils'
import {TailwindIndicator} from '@/components/tailwind-indicator'
import {Providers} from '@/components/providers'
import {Suspense} from "react";
import {NavigationEvents} from "@/components/navigation-events";

export const metadata = {
    metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
    title: {
        default: 'Score My Deck',
        template: `%s - Score My Deck`
    },
    description: 'Determine how investable your pitch deck is with Score My Deck',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    }
}

export const viewport = {
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: 'white'},
        {media: '(prefers-color-scheme: dark)', color: 'black'}
    ]
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                'font-sans antialiased',
                GeistSans.variable,
                GeistMono.variable
            )}
        >
        <Toaster/>
        <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
                <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
            </div>
            <TailwindIndicator/>
        </Providers>
        <Suspense fallback={null}>
            <NavigationEvents/>
        </Suspense>
        </body>
        </html>
    )
}
