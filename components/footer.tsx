import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">SwapArena</h3>
            <p className="text-sm text-muted-foreground">
              Stake on trade frequency or volume and win rewards in this DeFi gaming platform.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-muted-foreground hover:text-foreground">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-foreground">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} SwapArena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
