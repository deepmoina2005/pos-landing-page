import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { Home, ArrowLeft } from 'lucide-react'

const PageNotFound = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-background to-muted/20">
            <div className="relative mb-8">
                <h1 className="text-[12rem] font-black text-primary/10 select-none">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-foreground">Page Not Found</h2>
                </div>
            </div>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </Button>
                <Button onClick={() => navigate('/')} className="gap-2 shadow-lg shadow-primary/20">
                    <Home className="w-4 h-4" /> Home Page
                </Button>
            </div>
        </div>
    )
}

export default PageNotFound