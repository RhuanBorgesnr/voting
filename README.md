# Voting

Sistema de votação digital com frontend em React e backend em Django REST Framework.

## Como iniciar

1. Clone o repositório e acesse a pasta do projeto:
   ```bash
   git clone https://github.com/RhuanBorgesnr/voting.git
   cd voting
   ```

2. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
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

3. Suba toda a aplicação (frontend, backend e banco de dados) com:
   ```bash
   docker-compose up --build
   ```

- O frontend estará disponível em http://localhost:3000  
- O backend/API estará disponível em http://localhost:8000

## Criar usuário administrador

Para criar um usuário admin, execute:
```bash
docker-compose exec backend python manage.py createsuperuser
```
```
