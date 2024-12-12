import Navbar from "../components/Navbar"

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
          <body>
            <Navbar/>
            <main>{children}</main>
          </body>
        </html>
      )
  }