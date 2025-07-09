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

## CI/CD Pipeline

O projeto possui um pipeline completo de CI/CD implementado com GitHub Actions:

### Workflows Disponíveis

- **CI**: Executa testes e validações em push/PR
- **CD Staging**: Deploy automático para staging
- **CD Production**: Deploy manual para produção
- **Dependency Update**: Atualização automática de dependências

### Configuração

1. Configure os secrets no GitHub:
   - `DOCKER_USERNAME`: Usuário do Docker Hub
   - `DOCKER_PASSWORD`: Senha do Docker Hub

2. Para mais detalhes, consulte [docs/CI-CD.md](docs/CI-CD.md)

### Desenvolvimento

```bash
# Testes locais
cd api && python manage.py test
cd frontend && npm test

# Linting
cd api && flake8 . && black . && isort .
cd frontend && npm run lint
```
```
