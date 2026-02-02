import { TabsContent } from '@radix-ui/react-tabs'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/_layout/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <>
      <Tabs defaultValue="all">
        <TabsList className="w-full">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="main-room">Sala Principal</TabsTrigger>
          <TabsTrigger value="lounge">Lounge</TabsTrigger>
          <TabsTrigger value="bar">Barra</TabsTrigger>
          <TabsTrigger value="sport">Sport</TabsTrigger>
        </TabsList>
        <TabsContent value="all">Todos</TabsContent>
        <TabsContent value="main-room">Sala Principal</TabsContent>
        <TabsContent value="lounge">Lounge</TabsContent>
        <TabsContent value="bar">Barra</TabsContent>
        <TabsContent value="sport">Sport</TabsContent>
      </Tabs>

      <Button
        asChild
        className="fixed bottom-6 right-6 z-50 gap-2 rounded-full sm:h-auto sm:w-auto sm:rounded-md"
      >
        <Link to="/pos">
          <Plus className="size-5 sm:size-4" />
          <span className="hidden sm:inline">Nueva Orden</span>
        </Link>
      </Button>
    </>
  )
}
