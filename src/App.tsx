import { CardUser } from "./components/CardUser"
import { ThemeProvider } from "./components/theme/theme-provider"


export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
      <CardUser />
   
    </ThemeProvider>
    
    
  )
}