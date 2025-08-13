import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { SubRoute } from "./types";

export default function CardLink({ title, description, href }: SubRoute) {
    return (
        <Link href={href} className="group">
            <Card className="bg-neutral-100">
                <CardHeader>
                    <CardTitle className="text-accent-700 group-hover:underline">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-brand-500">{description}</p>
                </CardContent>
            </Card>
        </Link>
    );
}
