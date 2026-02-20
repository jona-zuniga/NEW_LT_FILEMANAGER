"use client"
import { useTheme } from "next-themes"
import { Toaster } from 'sonner'


export function ToasterComponent() {
    const { theme } = useTheme()
    return (
        <Toaster position="top-right" theme={theme} richColors></Toaster>
    )
}