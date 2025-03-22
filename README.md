# Elaboração de aplicação integrada a um banco de dados

## Aplicação para Gerenciamento de Tarefas

Aplicação web simples de gerenciamento de tarefas desenvolvido com Node.js, hospedado em uma instância EC2 da AWS, utilizando um banco de dados MySQL no Amazon RDS. Este gerenciador de tarefas permite que os usuários criem e visualizem tarefas. Cada tarefa possui título, descrição, data limite e prioridade.

## Vídeo de Demonstração

https://youtu.be/rcjacTEv8TU

## Funcionalidades

- Adicionar novas tarefas com título, descrição e data limite
- Definir níveis de prioridade (Baixa, Média, Alta)
- Visualizar todas as tarefas em uma lista organizada
- Identificação visual de tarefas por nível de prioridade

## Tecnologias Utilizadas

- Backend: Node.js com Express.js
- Frontend: HTML, CSS, JavaScript
- Banco de Dados: MySQL (Amazon RDS)
- Infraestrutura: Amazon EC2

## Estrutura do Banco de Dados
O aplicativo utiliza um banco de dados MySQL com a seguinte estrutura:
```sql
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_limite DATE,
    prioridade INT DEFAULT 1,
    concluida BOOLEAN DEFAULT FALSE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Campos da tabela:**

- id: Identificador único para cada tarefa
- titulo: Nome da tarefa (obrigatório)
- descricao: Detalhes adicionais sobre a tarefa
- data_limite: Prazo para conclusão da tarefa
- prioridade: Nível de importância da tarefa (1: Baixa, 2: Média, 3: Alta)
- concluida: Status de conclusão da tarefa
- data_criacao: Data e hora em que a tarefa foi criada


## Estrutura do Projeto

```
/
├── node_modules/         # Dependências do Node.js
├── public/               # Arquivos estáticos para o frontend
│   ├── index.html        # Página principal da aplicação
│   ├── script.js         # JavaScript do frontend
│   ├── style.css         # Folha de estilo CSS
│   └── .gitignore        # Arquivos ignorados pelo Git
├── db.js                 # Configuração da conexão com o banco de dados
├── package-lock.json     # Versões específicas das dependências
├── package.json          # Configuração do projeto e dependências
├── README.md             # Documentação do projeto
└── server.js             # Servidor Express e APIs
```

## Fluxo de Dados

1. Usuário acessa a aplicação web
2. O frontend carrega tarefas existentes via API
3. Usuário pode criar novas tarefas pelo formulário
4. Os dados são enviados para o backend
5. O backend salva a tarefa no banco de dados
6. A lista de tarefas é atualizada automaticamente

## Endpoints da API

- **GET /api/tarefas** - Listar todas as tarefas (ordenadas por data de criação)
- **POST /api/tarefas** - Criar uma nova tarefa

## Configuração da Infraestrutura

- Amazon EC2: Hospeda a aplicação Node.js
- Amazon RDS: Fornece um banco de dados MySQL gerenciado
- Configuração através de variáveis de ambiente para segurança