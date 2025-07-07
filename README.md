# Votação Digital

Sistema completo de votação digital com frontend em React e backend em Django REST Framework. Tudo é executado via Docker Compose, incluindo banco de dados, backend e frontend.

## Inicialização Rápida

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone <url-do-repositorio>
cd votacao-digital
```

2. Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (exemplo abaixo):

```env
DJANGO_DB_NAME=votacao_db
DJANGO_DB_USER=votacao_user
DJANGO_DB_PASSWORD=votacao_pass
DJANGO_DB_HOST=db
DJANGO_DB_PORT=5432
DJANGO_SECRET_KEY=changeme
DJANGO_DEBUG=1
REACT_APP_API_URL=http://localhost:8000
```

3. Suba toda a aplicação (backend, frontend e banco) com um único comando:

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend/API: http://localhost:8000
- Admin Django: http://localhost:8000/admin

## Usuário Administrador Padrão

Já existe um usuário administrador criado para acesso inicial:

- **Login:** admin
- **Senha:** admin123


## Testes Backend

```bash
docker-compose exec backend python manage.py test
```

Pronto. O sistema estará disponível para uso após o comando acima. 