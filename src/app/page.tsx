import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs.tsx";

export default function Home() {
  return (
    <Tabs defaultValue="lights">
      <header className="container flex items-center justify-center w-full">
        <TabsList className="m-4">
          <TabsTrigger className="text-3xl px-4" value="lights">
            Lights
          </TabsTrigger>
          <TabsTrigger className="text-3xl px-4" value="cleaning">
            Cleaning
          </TabsTrigger>
        </TabsList>
      </header>
      <TabsContent value="lights">
        <p>Account content</p>
      </TabsContent>
      <TabsContent value="cleaning">
        <p>Password content</p>
      </TabsContent>
    </Tabs>
  );
}
