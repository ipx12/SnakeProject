import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import MainButton from "@/components/web/mainButton/mainButton"
import { MoveRight, MoveDown } from "lucide-react";
import fourthSnake from "@/assets/images/fourthSnake.png";

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
        <section className="relative w-full min-h-screen flex flex-col justify-between px-4 md:px-8 xl:px-13 overflow-hidden bg-gradient-to-br from-[#ae5414] via-[#430960] to-[#120023] text-white">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 select-none z-0" />

            {/* Main Tabs Component Container */}
            <div className="relative font-halvar lg:max-w-[1440px] mx-auto flex-1 flex items-center justify-center w-full z-10">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="flex flex-col lg:flex-row gap-5 lg:gap-16 items-center lg:items-start justify-center w-full"
                >
                    {/* Tabs Triggers List */}
                    <TabsList className="flex flex-col lg:items-start gap-3 lg:gap-6 bg-transparent p-0 h-auto border-none z-10 shrink-0">
                        {TABS_DATA.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="group gap-3 md:px-8 lg:px-12 lg:py-6  py-3 px-8 data-[state=active]:bg-yellow-main data-[state=active]:text-black data-[state=active]:border-black bg-transparent text-yellow-main border-yellow-main border-2 lg:border-2 rounded-full font-bold tracking-wider flex items-center justify-between cursor-pointer duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                            >
                                <span className="text-xl lg:text-[32px] font-bold">{tab.triggerText}</span>

                                <MoveRight className="size-7" />

                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Content Cards */}
                    <div className="w-full p-0 max-w-xl lg:max-w-4xl min-h-[470px] lg:min-h-[470px] flex items-center justify-center z-10">
                        {TABS_DATA.map((tab) => (
                            <TabsContent
                                key={tab.id}
                                value={tab.id}
                                className="w-full outline-none"
                            >
                                <Card className="bg-[#9B00E8] text-white border-none ring-0 rounded-md px-4 lg:p-12 min-h-[470px] xl:min-h-[714px] flex flex-col items-center justify-center">
                                    <CardContent className="flex flex-col xl:gap-3 items-center max-w-[560px] justify-center p-0 text-center text-base sm:text-lg lg:text-xl font-bold">
                                        <p className="mb-4">
                                            {tab.p1}
                                        </p>
                                        <MoveDown className="size-7 xl:size-12 text-black animate-bounce"/>

                                        <p className="mb-4">
                                            {tab.p2}
                                        </p>

                                       <MoveDown className="size-7 xl:size-12 mb-2 text-black animate-bounce"/>

                                        <MainButton className="p-6 xl:p-10 text-xl sm:text-2xl font-bold">
                                            {tab.buttonText}
                                        </MainButton>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </div>
                    {/* Snake Image */}
                    <div className="hidden lg:block absolute bottom-0 left-0 pointer-events-none select-none z-0">
                        <img src={fourthSnake} className="w-full h-auto object-contain" alt="Snake" />
                    </div>
                </Tabs>
            </div>


        </section>
    )
}