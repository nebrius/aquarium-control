import { CleaningContent } from "@/components/cleaning/CleaningContent.tsx";
import { LightsContent } from "@/components/lights/LightsContent.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs.tsx";

export default function Home() {
  return (
    <Tabs className="absolute inset-[0]" defaultValue="lights">
      <header className="container flex items-center justify-center w-full">
        <TabsList className="m-4">
          <TabsTrigger className="text-xl px-4 py-2" value="lights">
            Lights
          </TabsTrigger>
          <TabsTrigger className="text-xl px-4 py-2" value="cleaning">
            Cleaning
          </TabsTrigger>
        </TabsList>
      </header>
      <TabsContent className="grow" value="lights">
        <LightsContent />
      </TabsContent>
      <TabsContent className="grow" value="cleaning">
        <CleaningContent />
      </TabsContent>
    </Tabs>
  );
}
