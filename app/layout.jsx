import '@styles/globals.css'

import NavBar from '@components/NavBar'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className='main'>
                        <div className="gradient" />
                    </div>
                    <main className='app'>
                        <NavBar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}