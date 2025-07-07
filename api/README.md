# Votação Digital API

API Django com autenticação JWT para sistema de votação digital.

## Instalação

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Execute as migrações:
```bash
python manage.py makemigrations
python manage.py migrate
```

3. Crie um superusuário (opcional):
```bash
python manage.py createsuperuser
```

4. Execute o servidor:
```bash
python manage.py runserver
```

## Endpoints de Autenticação

### Registro de Usuário
- **URL**: `POST /api/users/register/`
- **Dados necessários**:
```json
{
    "username": "usuario",
    "email": "usuario@exemplo.com",
    "first_name": "Nome",
    "last_name": "Sobrenome",
    "cpf": "12345678901",
    "password": "senha123",
    "password_confirm": "senha123"
}
```

### Login
- **URL**: `POST /api/users/login/`
- **Dados necessários**:
```json
{
    "username": "usuario",
    "password": "senha123"
}
```
- **Resposta**:
```json
{
    "access": "token_jwt_aqui",
    "refresh": "refresh_token_aqui",
    "user": {
        "id": 1,
        "username": "usuario",
        "email": "usuario@exemplo.com",
        "first_name": "Nome",
        "last_name": "Sobrenome",
        "cpf": "12345678901"
    }
}
```

### Refresh Token
- **URL**: `POST /api/users/token/refresh/`
- **Dados necessários**:
```json
{
    "refresh": "refresh_token_aqui"
}
```

### Verificar Token
- **URL**: `POST /api/users/token/verify/`
- **Dados necessários**:
```json
{
    "token": "access_token_aqui"
}
```

### Perfil do Usuário
- **URL**: `GET /api/users/profile/`
- **Headers**: `Authorization: Bearer <access_token>`

## Uso dos Tokens

Para acessar endpoints protegidos, inclua o header:
```
Authorization: Bearer <access_token>
```

## Configurações

- **Access Token**: 60 minutos
- **Refresh Token**: 1 dia
- **Algoritmo**: HS256
- **CORS**: Configurado para localhost:3000 

# Votação Digital - Ambiente FullStack Containerizado

## Como rodar tudo com um único comando

1. Certifique-se de ter Docker e Docker Compose instalados.
2. Clone o repositório e navegue até a raiz do projeto.
3. Execute:

```bash
docker-compose up --build
```

- O backend Django estará disponível em http://localhost:8000
- O frontend React estará disponível em http://localhost:3000
- O banco PostgreSQL estará rodando no container `db`.

## Variáveis de ambiente

As variáveis de ambiente estão no arquivo `.env` na raiz do projeto. Não coloque credenciais reais em produção!

## Estrutura dos containers

- **backend**: Django + DRF
- **frontend**: React
- **db**: PostgreSQL com persistência de dados

## Observações
- O backend aplica as migrações automaticamente ao subir.
- O frontend consome a API do backend em `http://localhost:8000`.
- Todos os dados do banco são persistidos no volume `postgres_data`.

Pronto! Todo o ambiente roda com apenas um comando 🚀 