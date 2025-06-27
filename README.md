
# 🛠️ Gestão de Ferramentas - *Cantier*

## 📖 Sobre o Projeto

**Gestão de Ferramentas** é uma solução completa desenvolvida para facilitar e otimizar o controle de equipamentos em ambientes de construção civil.
Seu principal objetivo é oferecer uma plataforma centralizada para registrar entradas, saídas e manutenções de ferramentas, promovendo mais **organização, segurança e eficiência** no dia a dia das obras.

---

## ✨ Funcionalidades Principais

* **Autenticação de Utilizadores**
  Sistema de login seguro com encriptação de senhas (bcrypt) e recuperação via token.

* **Gestão de Equipamentos (CRUD)**
  Cadastro, consulta, atualização e exclusão de equipamentos.

* **Leitura de QR Code**
  Leitor integrado para rápida identificação e busca de ferramentas.

* **Registro de Uso**
  Fluxo completo para registrar retirada e devolução de equipamentos, vinculados a um utilizador e a uma atividade.

* **Registro de Manutenção**
  Lançamento de serviços de manutenção, com descrição, custo e responsável.

* **Relatórios e Históricos**
  Consulta detalhada do histórico de uso e manutenções por equipamento.

---

## 🚀 Tecnologias Utilizadas

Este projeto segue a arquitetura **monorepo**, contendo:

### 🔹 Frontend (Aplicativo Móvel)

* **React Native com Expo** – Desenvolvimento para iOS e Android.
* **TypeScript** – Tipagem estática para maior robustez.
* **Expo Router** – Navegação entre telas.
* **React Native Paper** – Componentes de UI modernos.
* **Axios** – Comunicação com o backend.
* **React Native Gesture Handler** – Melhor experiência com gestos e navegação.

### 🔸 Backend (API)

* **Node.js** – Ambiente de execução.
* **Express.js** – Framework para API RESTful.
* **MongoDB com Atlas** – Banco de dados NoSQL na nuvem.
* **TypeScript** – Tipagem forte.
* **bcrypt** – Encriptação de senhas.
* **cors** – Comunicação segura entre frontend e backend.
* **express-validator** – Validação de dados nas rotas.

---

## ⚙️ Configuração e Instalação

### ✅ Pré-requisitos

* Node.js (versão 18 ou superior)
* Yarn (`npm install -g yarn`)
* Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* Aplicativo **Expo Go** no celular (iOS ou Android)

---

### 🔧 1. Backend

1. Navegue até a pasta do backend:

   ```bash
   cd caminho/para/seu/backend
   ```

2. Crie um arquivo `.env` na raiz com as variáveis:

   ```
   MONGODB_URI=...
   PORT=...
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

---

### 📱 2. Frontend

1. Navegue até a pasta do frontend:

   ```bash
   cd caminho/para/seu/frontend
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   yarn run start
   ```

Após isso, um QR Code será exibido no terminal.
Abra o app **Expo Go** no seu celular para escaneá-lo e iniciar o aplicativo.

---

## 👨‍💻 Autores

* **Michael Douglas**
* **Diego Cruz**

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.
Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
