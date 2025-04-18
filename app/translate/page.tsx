"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Globe, Upload, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function TranslatePage() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [sourceLanguage, setSourceLanguage] = useState<string>("")
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [translatedText, setTranslatedText] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleTranslate = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a document to translate.",
        variant: "destructive",
      })
      return
    }

    if (!sourceLanguage) {
      toast({
        title: "No language selected",
        description: "Please select the source language.",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)
    setTranslatedText("")

    const formData = new FormData();
    formData.append('file', file);
    formData.append('sourceLanguage', sourceLanguage);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Translation failed: ${response.statusText}`);
      }

      setTranslatedText(result.translatedText);
      toast({
        title: "Translation complete",
        description: "Your document has been successfully translated to English.",
      });

    } catch (error) {
      console.error("Translation Error:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Translation Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  }

  const handleDownload = () => {
    if (!translatedText) return

    const element = document.createElement("a")
    const file = new Blob([translatedText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "translated-document.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Download started",
      description: "Your translated document is being downloaded.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Globe className="h-6 w-6 text-primary" />
            <span>TranslatePro</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Document Translation</h1>
              <p className="text-muted-foreground">
                Upload your document and select the source language to translate it to English.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Document</CardTitle>
                  <CardDescription>Select the document you want to translate and the source language.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full gap-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm font-medium">
                          {file ? file.name : "Drag and drop or click to upload"}
                        </p>
                        <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT (max 10MB)</p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <div className="grid w-full gap-2">
                    <label
                      htmlFor="language"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Source Language
                    </label>
                    <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="ru">Russian</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="ko">Korean</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleTranslate} disabled={isTranslating} className="w-full">
                    {isTranslating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      "Translate to English"
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Translation Result</CardTitle>
                  <CardDescription>The English translation of your document will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Translation will appear here..."
                    className="min-h-[200px]"
                    value={translatedText}
                    readOnly
                  />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleDownload} disabled={!translatedText} variant="outline" className="w-full">
                    Download Translation
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
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
        </div>
      </footer>
    </div>
  )
}
