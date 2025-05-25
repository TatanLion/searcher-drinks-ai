
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import Layout from "./layouts/Layout";
import { lazy, Suspense } from "react";
// Forma de generar lazy y suspense en las rutas para que al hacer le build no cargue todo en un mismo js y lo separe evitando que el bundle sea mas grande y la pagina inicial cargue mas lento.
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))
const GenerateAI = lazy(() => import('./views/GenerateAI'))

/** NOTE Se puede usar también para la página principal **/

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/favoritos" element={
            // Se mete dentro del suspense para que se desargue solo al visitarla
            <Suspense 
              // Se puede cargar un componente o texto que se muestre mientras la pagina carga
              fallback={
                <div className="text-center">Cargando...</div>
              }>
              <FavoritesPage />
            </Suspense>} 
          />
          <Route path="/generate" element={
            // Se mete dentro del suspense para que se desargue solo al visitarla
            <Suspense 
              // Se puede cargar un componente o texto que se muestre mientras la pagina carga
              fallback={
                <div className="text-center">Cargando...</div>
              }>
              <GenerateAI />
            </Suspense>} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
