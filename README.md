# Karhamelo 🍯 - Seu Universo de Links

![Status](https://img.shields.io/badge/status-Prot%C3%B3tipo%20Completo-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-cyan?logo=tailwind-css)
![Genkit](https://img.shields.io/badge/AI-Genkit-orange)

**Karhamelo** é a forma mais doce de marcar sua presença online. Crie uma página de links personalizada, um portfólio profissional e gerencie tudo em uma plataforma simples e poderosa.

---

### ✨ Funcionalidades Principais

-   🎨 **Editor de Página de Links:** Adicione, edite, exclua e reordene seus links com uma pré-visualização em tempo real.
-   🖼️ **Editor de Portfólio (LP):** Construa uma Landing Page de uma página com seções personalizáveis (Hero, Benefícios, Galeria, etc.).
-   🖌️ **Personalização de Tema Avançada:**
    -   Temas pré-definidos e cores personalizadas.
    -   Estilos de botão (preenchido/contorno, raios de borda, sombras).
    -   Padrões de fundo para um visual único.
-   🤖 **Assistente de Estilo com IA:** Receba sugestões de temas e paletas de cores geradas por IA com base no conteúdo do seu perfil.
-   📈 **Dashboard de Analytics:** Acompanhe métricas essenciais como visualizações de perfil e cliques totais nos links.
-   👤 **Gerenciamento de Perfil:** Atualize seu nome, biografia, foto de perfil (com editor integrado) e links de redes sociais.
-   🐶 **Mascote Interativo:** Um chatbot amigável "Karhamelo" dá as boas-vindas aos usuários nas telas de login e cadastro.
-   🔒 **Autenticação Simplificada:** Interface pronta para integração com provedores OAuth (como Google via Supabase).
-   Billing e Configurações: Páginas dedicadas para gerenciamento de assinaturas e preferências do usuário.

### 🛠️ Stack de Tecnologia

-   **Framework:** [Next.js](https://nextjs.org/) (com App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **UI:** [React](https://react.dev/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes:** [ShadCN/UI](https://ui.shadcn.com/)
-   **Inteligência Artificial:** [Genkit](https://firebase.google.com/docs/genkit)
-   **Animações:** [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/) (implícito em alguns componentes)
-   **Formulários:** [React Hook Form](https://react-hook-form.com/)
-   **Validação de Schema:** [Zod](https://zod.dev/)

### 🚀 Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/karhamelo.git
    cd karhamelo
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    -   Renomeie o arquivo `.env.example` para `.env.local`.
    -   Adicione sua chave da API do Google AI para as funcionalidades de Genkit.
    ```
    GEMINI_API_KEY=SUA_CHAVE_AQUI
    ```

4.  **Execute o ambiente de desenvolvimento:**
    O projeto precisa de dois terminais rodando simultaneamente.

    -   **Terminal 1: Aplicação Next.js**
        ```bash
        npm run dev
        ```
        Acesse em `http://localhost:9002`.

    -   **Terminal 2: Genkit (Servidor da IA)**
        ```bash
        npm run genkit:watch
        ```

5.  **Pronto para usar!** 🎉 Explore todas as funcionalidades do protótipo.

### 📂 Estrutura do Projeto

```
/
├── public/           # Arquivos estáticos (logo, imagens)
├── src/
│   ├── app/          # Rotas da aplicação (App Router)
│   ├── components/   # Componentes React reutilizáveis
│   ├── ai/           # Lógica de IA com Genkit (flows)
│   ├── hooks/        # Hooks React personalizados
│   ├── lib/          # Utilitários, tipos e helpers
│   └── ...
├── tailwind.config.ts  # Configuração do Tailwind CSS
└── next.config.ts      # Configuração do Next.js
```

---

*#link-in-bio #portfolio-builder #saas #nextjs #react #tailwindcss #genkit #ai*
