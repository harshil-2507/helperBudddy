"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, ChevronRight } from 'lucide-react'

export function AiAssistant() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className={`p-4 transition-all duration-300 ${isExpanded ? "pb-2" : ""}`}>
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-indigo-600 p-2 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-lg text-white">AI Assistant</h3>
              <div className="ml-auto">
                <Button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  variant="ghost" 
                  className="h-8 w-8 p-0 rounded-full bg-gray-800 hover:bg-indigo-700 transition-colors"
                >
                  <ChevronRight className={`h-4 w-4 text-white transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                </Button>
              </div>
            </div>
            
            {isExpanded && (
              <div className="mt-3 mb-2 text-gray-300 text-sm">
                <p className="mb-4">Your personal AI assistant is here to help you analyze data and make better decisions.</p>
                <div className="space-y-2">
                  <div className="bg-gray-800/70 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      <span>Analyze your data performance</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      <span>Generate reports automatically</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className={`px-4 pb-4 ${isExpanded ? "mt-2" : "mt-0"}`}>
            <Button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all"
            >
              {isExpanded ? "Close" : "Get Started"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}