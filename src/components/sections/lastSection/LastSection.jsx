import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import MainButton from "@/components/web/mainButton/mainButton"
import { MoveRight } from "lucide-react";

const TABS_DATA = [
    {
        id: "media-buyers",
        triggerText: "For Media Buyers",
        p1: "Got experience with sweepstakes and large ad budgets? Looking for a team where you can grow and scale without limits?",
        p2: "Multiply your profits with MULTICPA — we provide the budget, all the tools and high profit shares",
        buttonText: "Join the team"
    },
    {
        id: "businesses",
        triggerText: "For Businesses",
        p1: "Looking for high-quality leads, scale, and performance-based marketing? Partner with us to drive target actions for your products.",
        p2: "Maximize your ROI with MULTICPA — gain access to premium traffic sources and optimized advertising campaigns.",
        buttonText: "Start growing"
    },
    {
        id: "partners",
        triggerText: "For Partners",
        p1: "Want to monetize your traffic or recommend top-tier offers? Join our referral and partner programs with high commission rates.",
        p2: "Earn more with MULTICPA — enjoy flexible payout terms, real-time analytics, and dedicated support.",
        buttonText: "Join program"
    }
]

export function LastSection() {
    const [activeTab, setActiveTab] = useState("media-buyers")

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-between py-8 md:py-16 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-[#ae5414] via-[#430960] to-[#120023] text-white font-sans">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 select-none z-0" />

            {/* Glowing Curves SVG Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none z-0">
                <svg className="absolute w-full h-full text-yellow-main" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M-100,250 Q350,50 800,450 T1700,100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M-50,400 Q450,150 950,600 T1800,200" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M0,550 Q550,250 1100,750 T1900,300" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Main Tabs Component Container */}
            <main className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 py-8 z-10">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center w-full"
                >
                    {/* Tabs Triggers List */}
                    <TabsList className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto bg-transparent p-0 h-auto border-none z-10 shrink-0">
                        {TABS_DATA.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="group py-2 px-6 data-[state=active]:bg-yellow-main data-[state=active]:text-black data-[state=active]:border-black bg-transparent text-yellow-main border-yellow-main border-2 lg:border-[3px] rounded-full font-bold tracking-wider flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                            >
                                <span className="text-[20px] lg:text-[28px] font-bold">{tab.triggerText}</span>

                                <MoveRight className="size-8" />

                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Content Cards */}
                    <div className="w-full max-w-xl lg:max-w-2xl min-h-[460px] lg:min-h-[480px] flex items-center justify-center z-10">
                        {TABS_DATA.map((tab) => (
                            <TabsContent
                                key={tab.id}
                                value={tab.id}
                                className="w-full outline-none data-[state=inactive]:hidden"
                            >
                                <Card className="bg-[#9B00E8] text-white border-none ring-0 shadow-[0_0_40px_rgba(155,0,232,0.25)] rounded-[32px] p-6 lg:p-12 min-h-[440px] lg:min-h-[460px] flex items-center justify-center">
                                    <CardContent className="flex flex-col items-center justify-center p-0 text-center animate-in fade-in-30 slide-in-from-bottom-5 zoom-in-95 duration-500 ease-out">
                                        <p className="text-base lg:text-lg font-medium mb-4 lg:mb-6 leading-relaxed max-w-lg select-text">
                                            {tab.p1}
                                        </p>

                                        <svg className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-main my-2 lg:my-3 animate-bounce select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>

                                        <p className="text-base lg:text-lg font-semibold mb-6 lg:mb-8 leading-relaxed max-w-lg select-text">
                                            {tab.p2}
                                        </p>

                                        <svg className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-main mb-6 lg:mb-8 animate-bounce select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>

                                        <MainButton className="font-semibold text-xs lg:text-sm px-8 py-4">
                                            {tab.buttonText}
                                        </MainButton>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </main>

        </section>
    )
}