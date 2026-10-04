// app/page.tsx — Página principal com a cena 3D

import { Scene3D } from "@/components/Scene3D";

export default function Home() {
  return (
    <main>
      {/* Scene3D ocupa a tela inteira */}
      <Scene3D />

      {/* Conteúdo normal abaixo do 3D */}
      <section className="content">
        <h1>React Three Fiber</h1>
        <p>3D no React — declarativo, integrado, poderoso.</p>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────
// Se precisar de import dinâmico (evita SSR do canvas):
// ─────────────────────────────────────────────────
//
// import dynamic from "next/dynamic";
//
// const Scene3D = dynamic(
//   () => import("@/components/Scene3D").then((m) => m.Scene3D),
//   { ssr: false }  // não renderiza no servidor
// );
//
// Recomendado quando há erros de hydration
