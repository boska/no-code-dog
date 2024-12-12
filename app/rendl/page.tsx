'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Upload } from "lucide-react"

// Helper function to format bytes into human readable format
function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export default function RendlPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [fileSize, setFileSize] = useState<string | null>(null)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setError(null)
        setFileSize(null)

        if (!file) return

        // Check if file is an XLS/XLSX file
        const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if (!validTypes.includes(file.type)) {
            setError('Please select a valid Excel file (.xls or .xlsx)')
            return
        }

        setSelectedFile(file)
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        // Set and display file size
        const size = formatFileSize(selectedFile.size)
        setFileSize(size)

        console.log('Processing file:', selectedFile.name, 'Size:', size)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Excel File Upload</CardTitle>
                    <CardDescription>
                        Select an Excel file (.xls or .xlsx) to process
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                            type="file"
                            accept=".xls,.xlsx"
                            onChange={handleFileSelect}
                            className="cursor-pointer"
                        />
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                        {selectedFile && (
                            <p className="text-sm text-muted-foreground">
                                Selected: {selectedFile.name}
                            </p>
                        )}
                        {fileSize && (
                            <p className="text-sm text-muted-foreground">
                                File size: {fileSize}
                            </p>
                        )}
                    </div>
                    <Button
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        className="w-full"
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload and Process
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
} 