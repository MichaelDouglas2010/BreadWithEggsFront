# 🛠️ Gestão de Ferramentas - Pão com Ovo
## 📖 Sobre o Projeto
O projeto Gestão de Ferramentas é uma solução completa desenvolvida para facilitar e otimizar o controlo de equipamentos em ambientes de construção civil. O objetivo principal é oferecer uma plataforma centralizada para registar a entrada, saída e manutenção de ferramentas, aumentando a organização, a segurança e a eficiência das equipas no dia a dia da obra.

## ✨ Funcionalidades Principais
Autenticação de Utilizadores: Sistema de login seguro com encriptação de senhas (bcrypt) e recuperação de senha via token.

Gestão de Equipamentos (CRUD): Cadastro, consulta, alteração e exclusão de equipamentos.

Leitura de QR Code: Leitor de QR Code integrado para identificar e buscar equipamentos rapidamente.

Registo de Uso: Fluxo completo para registar a saída e a entrada (devolução) de equipamentos, associado a um utilizador e a uma atividade.

Registo de Manutenção: Sistema para registar serviços de manutenção realizados, incluindo descrição, custo e responsável.

Relatórios e Históricos: Consulta detalhada do histórico de uso e de manutenção para cada equipamento.

## 🚀 Tecnologias Utilizadas
Este projeto é um monorepo que contém duas partes principais: o frontend (aplicativo móvel) e o backend (API).

Frontend (Aplicação Móvel)
React Native com Expo: Para o desenvolvimento multiplataforma (iOS e Android).

TypeScript: Para um código mais seguro e robusto.

Expo Router: Para a gestão de rotas e navegação entre ecrãs.

React Native Paper: Para componentes de UI estilizados e consistentes.

Axios: Para fazer as requisições HTTP para o backend.

React Native Gesture Handler: Para uma melhor gestão de gestos e navegação.

Backend (API)
Node.js: Ambiente de execução do servidor.

Express.js: Framework para a construção da API RESTful.

MongoDB com Atlas: Banco de dados NoSQL na nuvem para armazenar todos os dados.

TypeScript: Para tipagem forte no backend.

bcrypt: Para a encriptação segura de senhas.

cors: Para permitir a comunicação segura entre o frontend e o backend.

express-validator: Para a validação dos dados que chegam nas rotas.

## ⚙️ Configuração e Instalação
Siga os passos abaixo para configurar e executar o projeto localmente.

Pré-requisitos
Node.js (versão 18 ou superior)

Yarn (pode ser instalado com npm install -g yarn)

Uma conta no MongoDB Atlas e uma string de conexão.

O aplicativo Expo Go instalado no seu telemóvel (iOS ou Android).

1. Backend
Primeiro, configure e inicie o servidor da API.

### 1. Navegue para a pasta do backend
cd caminho/para/seu/backend

### 2. Crie um ficheiro .env na raiz da pasta do backend e adicione as suas variáveis:
### (use o modelo abaixo)

### 3. Instale as dependências
npm install

### 4. Inicie o servidor
npm start

Modelo para o ficheiro .env:

MONGODB_URI="sua_string_de_conexao_do_mongodb_atlas"
PORT=3000

2. Frontend
Com o backend a rodar, configure e inicie o aplicativo móvel.

### 1. Navegue para a pasta do frontend
cd caminho/para/seu/frontend

### 2. Instale as dependências com Yarn (como mencionado na sua configuração)
yarn install

### 3. Inicie o servidor de desenvolvimento do Expo
yarn run start

Após executar yarn run start, um QR Code será exibido no seu terminal. Digitalize-o com a câmara do seu telemóvel (iOS) ou com o aplicativo Expo Go (Android) para abrir o aplicativo no seu dispositivo.

## 👨‍💻 Autores
Michael Douglas

Diego Cruz

## 📄 Licença
Este projeto está sob a licença MIT. Veja o ficheiro LICENSE para mais detalhes.
