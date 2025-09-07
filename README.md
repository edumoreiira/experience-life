# Experience Life - Front-End Institucional

Este é o repositório do front-end para o site institucional do **Experience Life**, um servidor de San Andreas Multiplayer (SAMP). O projeto, desenvolvido com **Angular**, serve como uma vitrine para o servidor, oferecendo funcionalidades como ranking de jogadores e um portal para doações.

Um dos principais focos do projeto foi a criação de uma interface rica e acessível, com todos os componentes de UI desenvolvidos do zero, sem o uso de bibliotecas externas.

## 🚀 Live Demo

**Visualize o projeto em ação acessando o link do GitHub Pages:**

### **[https://edumoreiira.github.io/experience-life/](https://edumoreiira.github.io/experience-life/)**

## ✨ Funcionalidades

  - **Página Institucional:** Apresentação do servidor e da comunidade.
  - **Sistema de Doações:** Interface para que os usuários possam realizar doações.
  - **Ranking de Jogadores:** Exibição da classificação dos jogadores.
  - **Área de Login:** Portal de acesso para a área restrita do jogador.
  - **UCP (Painel de Controle do Usuário):** Após o login, o usuário é direcionado para a rota `/ucp/`, onde pode interagir com sua conta do jogo.

## ⚠️ Status do Projeto

  - **Apenas Front-End:** Este repositório contém **exclusivamente o código do front-end**. Nenhuma funcionalidade de back-end (como autenticação ou busca de dados reais) está implementada.
  - **UCP Incompleto:** A seção do Painel de Controle do Usuário (UCP) é um protótipo e está **incompleta**, com diversas telas e funcionalidades pendentes de desenvolvimento.

## 💻 Tecnologias Utilizadas

  - **Angular**
  - **TypeScript**
  - **SCSS** (com metodologia BEM)
  - **Angular Router**

## ⚙️ Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/edumoreiira/experience-life.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd experience-life
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Execute o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```
    Acesse `http://localhost:4200/` no seu navegador.

## 🤝 Boas Práticas e Destaques do Código

Este projeto foi construído com uma forte ênfase na qualidade do código, acessibilidade e na criação de uma experiência de usuário controlada e customizada.

### Desenvolvimento de Componentes e UI

  * **UI Criada do Zero (No UI Libraries):** É um diferencial importante do projeto o fato de **não utilizar nenhuma biblioteca de UI externa** (como Angular Material, Bootstrap, etc.). Todos os componentes, incluindo modais, dropdowns, botões e a estrutura de layout, foram desenvolvidos do zero. Isso garantiu controle total sobre o HTML, a estilização e o comportamento, resultando em uma interface otimizada e única.
  * **Estilização com BEM:** Todo o código SCSS foi escrito seguindo as diretrizes da metodologia BEM (`Bloco__Elemento--Modificador`). Essa abordagem resulta em um CSS mais legível, modular e escalável, evitando conflitos de especificidade.

### Foco em Acessibilidade (A11y)

  * **Uso de Atributos ARIA:** A semântica do HTML foi enriquecida com o uso de **atributos ARIA (Accessible Rich Internet Applications)**. Essa prática é fundamental para melhorar a experiência de usuários que dependem de tecnologias assistivas, como leitores de tela, tornando a aplicação mais inclusiva e navegável.
  * **Diretiva `focusTrap` para Modais e Dropdowns:** Para componentes que abrem em sobreposição, foi implementada uma **diretiva `focusTrap`**. Ela confina a navegação via teclado (usando a tecla `TAB`) dentro do componente ativo, impedindo que o foco "vaze" para os elementos no fundo da página. Esta é uma técnica crucial para garantir a usabilidade e acessibilidade em interfaces interativas.

### Arquitetura Angular

  * **Arquitetura Baseada em Componentes:** A interface é dividida em componentes reutilizáveis e com responsabilidades bem definidas, facilitando a manutenção.
  * **Roteamento com Angular Router:** A navegação entre a página principal e a área do UCP é gerenciada pelo módulo de rotas do Angular, proporcionando uma experiência de Single-Page Application (SPA).
