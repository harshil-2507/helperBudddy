// components/FAQSection.tsx
"use client";
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../(components)/ui/accordion";
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const faqData = [
    {
      question: "What is HelperBuddy?",
      answer: "HelperBuddy is a cleaning service that helps keep your home and office clean. We also clean air conditioning units. Our goal is to make your spaces fresh and healthy."
    },
    {
      question: "What cleaning services do you offer?",
      answer: "We offer a variety of cleaning services, including home cleaning, office cleaning, and AC cleaning. Whether you need a deep clean or regular maintenance, we've got you covered."
    },
    {
      question: "How do I book a cleaning service?",
      answer: "Booking is easy! Just give us a call or fill out our online form. We'll set up a time that works best for you."
    },
    {
      question: "How much does your service cost?",
      answer: "The cost depends on the size of your home or office and the type of cleaning you need. We have options for every budget. For exact prices, check our pricing page/contact us."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        
        <div className="mx-auto max-w-3xl space-y-4">
          <Accordion type="single" collapsible className="space-y-6">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index + 1}`}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200 w-full flex items-center justify-between">
                    <span className="flex-1 pr-8">{faq.question}</span>
                    <ChevronDown className="absolute right-6 h-5 w-5 text-gray-500 transition-transform duration-300 transform group-data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                </div>
                
                <AccordionContent className="px-6 py-4 text-gray-600">
                  <div className="prose prose-gray max-w-none">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;