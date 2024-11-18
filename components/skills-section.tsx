import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"

interface Skill {
    name: string
    icon?: string
}

interface SkillCategory {
    title: string
    skills: Skill[]
}

const skillCategories: SkillCategory[] = [
    {
        title: "iOS Development",
        skills: [
            {
                name: "Swift",
                icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg"
            },
            {
                name: "SwiftUI",
                icon: "https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96_2x.png"
            },
            {
                name: "UIKit",
                icon: "https://developer.apple.com/assets/elements/icons/uikit/uikit-96x96.png"
            },
            { name: "Objective-C" },
            { name: "CoreML" },
            { name: "AVFoundation" }
        ]
    },
    {
        title: "Frontend Development",
        skills: [
            {
                name: "React",
                icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
            },
            { name: "TypeScript" },
            { name: "JavaScript" },
            { name: "HTML/CSS" }
        ]
    },
    {
        title: "Backend & Tools",
        skills: [
            {
                name: "Node.js",
                icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
            },
            { name: "Firebase" },
            { name: "RESTful APIs" },
            { name: "Git" }
        ]
    }
]

export function SkillsSection() {
    return (
        <Card className="bg-card/30 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <Badge
                                        key={skill.name}
                                        variant="secondary"
                                        className="flex items-center gap-1 px-2 py-1"
                                    >
                                        {skill.icon && (
                                            <Image
                                                src={skill.icon}
                                                alt={skill.name}
                                                width={16}
                                                height={16}
                                                className="w-4 h-4"
                                            />
                                        )}
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
} 