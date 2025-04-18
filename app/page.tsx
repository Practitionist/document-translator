import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Globe, FileText, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Globe className="h-6 w-6 text-primary" />
            <span>TranslatePro</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Testimonials
              </Link>
              <Link
                href="/translate"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Translate
              </Link>
              <Button asChild>
                <Link href="/translate">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Translate Documents to English with Ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our AI-powered platform translates documents from over 100 languages to English with exceptional
                    accuracy and speed.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/translate">
                      Start Translating
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <Image
                src="/global-document-translation.png"
                width={550}
                height={550}
                alt="Document translation illustration"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Translation Tools</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform offers a comprehensive suite of translation features designed for businesses and
                  individuals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">100+ Languages</h3>
                  <p className="text-muted-foreground">
                    Translate documents from over 100 languages to English with high accuracy.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Multiple File Formats</h3>
                  <p className="text-muted-foreground">Support for PDF, DOCX, TXT, and many other document formats.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Fast Processing</h3>
                  <p className="text-muted-foreground">Get your translated documents in minutes, not hours or days.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Translating your documents is simple and straightforward with our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Upload Your Document</h3>
                  <p className="text-muted-foreground">
                    Upload your document in any supported format to our secure platform.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Select Source Language</h3>
                  <p className="text-muted-foreground">
                    Choose the source language or let our AI automatically detect it.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Get Your Translation</h3>
                  <p className="text-muted-foreground">Receive your professionally translated document in English.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that works best for your translation needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold">Basic</h3>
                  <div className="mt-4 text-4xl font-bold">
                    $9<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 10 documents per month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>20 pages per document</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Standard translation quality</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-6" variant="outline">
                  Get Started
                </Button>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm ring-2 ring-primary">
                <div>
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="mt-4 text-4xl font-bold">
                    $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 50 documents per month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>50 pages per document</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Enhanced translation quality</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority processing</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-6">Get Started</Button>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <div className="mt-4 text-4xl font-bold">Custom</div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited documents</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited pages</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Premium translation quality</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-6" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Trusted by thousands of businesses and individuals worldwide.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                <div>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/diverse-group-city.png"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-bold">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">Marketing Director</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "TranslatePro has been a game-changer for our international marketing campaigns. The translations
                    are accurate and maintain our brand voice perfectly."
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                <div>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/diverse-group-city.png"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-bold">David Chen</h3>
                      <p className="text-sm text-muted-foreground">Legal Consultant</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "I rely on TranslatePro for translating complex legal documents. The accuracy and speed of the
                    service have saved me countless hours of work."
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                <div>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/diverse-group-city.png"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-bold">Maria Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">Academic Researcher</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "As a researcher working with international sources, TranslatePro has been invaluable. The technical
                    translations are precise and maintain all the nuances of the original text."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Start Translating?</h2>
                <p className="max-w-[900px] md:text-xl">
                  Join thousands of satisfied customers who trust TranslatePro for their document translation needs.
                </p>
              </div>
              <Button asChild size="lg" variant="secondary">
                <Link href="/translate">
                  Start Translating Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-2 items-center text-lg font-bold">
            <Globe className="h-5 w-5 text-primary" />
            <span>TranslatePro</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 TranslatePro. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
