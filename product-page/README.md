# 🛍️ Página de Produto E-commerce - React + Tailwind CSS

Uma página de produto moderna e responsiva para e-commerce, desenvolvida com React e Tailwind CSS, inspirada nas melhores práticas de grandes marketplaces como Mercado Livre, Amazon e Shopee.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📸 Preview

### Desktop
- Layout em duas colunas com galeria de imagens à esquerda
- Informações detalhadas do produto à direita
- Interface limpa e moderna com animações suaves

### Mobile
- Layout otimizado para toque
- Galeria fullscreen ao clicar nas imagens
- Botões de ação fixos para fácil acesso

## ✨ Funcionalidades

### 🖼️ Galeria de Imagens Dinâmica
- Visualização de múltiplas imagens do produto
- Navegação por miniaturas clicáveis
- Zoom ao passar o mouse (desktop)
- Galeria fullscreen no mobile
- Indicadores de navegação touch-friendly

### 📱 Design Totalmente Responsivo
- Mobile-first approach
- Breakpoints otimizados para todos os dispositivos
- Layout adaptativo que mantém a usabilidade em qualquer tela

### 🎨 Seletores de Variantes
- Seleção dinâmica de cores com preview visual
- Grid de tamanhos gerado automaticamente
- Feedback visual nas seleções
- Fácil adição de novas variantes

### 📍 Consulta de CEP Integrada
- Integração com API ViaCEP
- Validação e formatação automática
- Exibição completa do endereço
- Cálculo de frete simulado

### 💾 Persistência de Dados (15 minutos)
- Salvamento automático de todas as seleções
- Recuperação ao recarregar a página
- Expiração configurável
- Usa localStorage com controle de timestamp

### 🎯 Recursos Adicionais
- Sistema de avaliação com estrelas
- Contador de quantidade intuitivo
- Botão de favoritos funcional
- Compartilhamento social
- Cálculo de parcelamento
- Indicador de desconto

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- NPM ou Yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ecommerce-product-page.git
cd ecommerce-product-page
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento
```bash
npm start
# ou
yarn start
```

4. Acesse `http://localhost:3000` no navegador

## 📦 Dependências

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0"
}
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos e customizáveis
- **ViaCEP API** - Consulta de endereços por CEP
- **localStorage** - Persistência de dados no navegador

## 📂 Estrutura do Projeto

```
ecommerce-product-page/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── ProductPage.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customização

### Alterando Cores do Tema
No arquivo `tailwind.config.js`, você pode customizar as cores:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981'
      }
    }
  }
}
```

### Adicionando Novos Produtos
Modifique o objeto `product` no componente:

```javascript
const product = {
  name: "Seu Produto",
  price: 99.90,
  images: ["url1", "url2"],
  sizes: ["P", "M", "G"],
  colors: [
    { name: "Azul", hex: "#3B82F6" }
  ]
}
```
