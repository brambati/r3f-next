import "./globals.css";

export const metadata = {
  title: "React Three Fiber",
  description: "3D no React com React Three Fiber e Drei",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
