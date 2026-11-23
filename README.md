# SmartStock – Front-end

Interface web do Projeto Integrador SmartStock (Programa de Estágio de Férias, Dia 7).
Desenvolvida com **React + Vite**, seguindo o protótipo do Figma da Atividade 6.

## Telas
- **Login** – e-mail e senha (autenticação simulada até o Dia 8)
- **Dashboard** – KPIs, gráfico Entradas x Saídas, alertas de reposição e movimentações recentes
- **Produtos** – listagem com busca e filtro, cadastro, edição e exclusão
- **Movimentações** – entrada e saída com validação de saldo e histórico
- **Relatórios** – resumo, posição por categoria, estoque baixo e exportação CSV
- **Configurações** – dados da empresa, notificações e integrações

## Tecnologias
- React 18, React Router, Recharts (gráficos), CSS puro com variáveis de tema
- Layout responsivo: menu lateral vira menu hambúrguer em telas menores que 768px

## Como rodar
Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Acesse o endereço mostrado no terminal (geralmente http://localhost:5173).

Para gerar a versão de produção: `npm run build`.

## Estrutura
```
src/
├── components/   Layout, componentes reutilizáveis (ui.jsx)
├── context/      Estado global (StockContext)
├── data/         Dados de exemplo (mock)
├── pages/        Telas
├── App.jsx       Rotas e proteção de telas
├── main.jsx      Ponto de entrada
└── index.css     Tema e responsividade
```

## Próximos passos (Dia 8)
- Substituir os dados de exemplo por chamadas à API
- Autenticação real com JWT

## Protótipo
https://www.figma.com/design/RpXIlooxjVCM6fPCsVEQYx
