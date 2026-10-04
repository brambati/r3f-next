# React Three Fiber + Next.js

Código do vídeo **"React Three Fiber"** do canal da [Digital Lift](https://digitallift.com.br).

Cena 3D declarativa dentro do React: esfera distorcida com `MeshDistortMaterial`, fundo de estrelas, controle com o mouse e a cor do material vinda de um `useState`. Next.js (App Router) + React Three Fiber + Drei.

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## O essencial

```tsx
<Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
  <ambientLight intensity={0.5} />
  <directionalLight position={[3, 3, 3]} intensity={2} />
  <AnimatedSphere color={color} />
  <Stars />
  <OrbitControls />
</Canvas>
```

| Conceito | O que faz |
|---|---|
| `<Canvas>` | cria scene, camera e renderer de uma vez |
| `<mesh>`, `<sphereGeometry>` | as classes do Three.js em JSX, em camelCase |
| `args={[...]}` | os argumentos do construtor da classe |
| `useFrame` | roda a cada frame, sem re-render do React |
| Drei | `MeshDistortMaterial`, `OrbitControls`, `Stars` e dezenas de outros |
| `useState` | o estado do React controla a cena (aqui, a cor) |
| `onPointerOver` / `onPointerOut` | eventos em qualquer objeto 3D |

## Atenção no Next.js

O componente com o `Canvas` precisa de `"use client"`, porque o Three.js usa APIs do navegador. Se aparecer erro de hydration, use o import dinâmico com `ssr: false` (exemplo comentado no fim de `app/page.tsx`).

## Arquivos

- `components/Scene3D.tsx`: a cena completa
- `app/page.tsx`: a página que usa a cena
- `app/globals.css`: layout e botões de cor
