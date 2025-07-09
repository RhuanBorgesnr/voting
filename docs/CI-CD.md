# CI/CD Pipeline

Este documento descreve o sistema de CI/CD implementado para o projeto de votação digital.

## Workflows

### 1. CI (Continuous Integration) - `.github/workflows/ci.yml`

Executa automaticamente em:
- Push para branches `main` e `develop`
- Pull Requests para branches `main` e `develop`

**Jobs:**
- **test-backend**: Testa o backend Django
  - Instala dependências Python
  - Executa linting (flake8, black, isort)
  - Executa testes com cobertura
  - Usa PostgreSQL como serviço

- **test-frontend**: Testa o frontend React
  - Instala dependências Node.js
  - Executa linting (ESLint)
  - Executa testes
  - Faz build da aplicação

- **security-scan**: Escaneamento de segurança
  - Executa Trivy para vulnerabilidades
  - Upload dos resultados para GitHub Security

### 2. CD Staging - `.github/workflows/cd-staging.yml`

Executa automaticamente em:
- Push para branch `develop`

**Jobs:**
- **deploy-staging**: Deploy para ambiente de staging
  - Build e push das imagens Docker
  - Deploy para ambiente de staging
  - Notificação de sucesso

### 3. CD Production - `.github/workflows/cd-production.yml`

Executa manualmente via:
- GitHub Actions UI (workflow_dispatch)

**Jobs:**
- **deploy-production**: Deploy para produção
  - Build e push das imagens Docker
  - Deploy para produção
  - Health checks
  - Notificação de sucesso

### 4. Dependency Update - `.github/workflows/dependency-update.yml`

Executa:
- Automaticamente toda segunda-feira às 2h
- Manualmente via GitHub Actions UI

**Jobs:**
- **update-dependencies**: Atualiza dependências
  - Atualiza dependências Python
  - Atualiza dependências Node.js
  - Cria Pull Request com as atualizações

## Configurações

### Backend (Python/Django)

- **pytest.ini**: Configuração de testes
- **.flake8**: Configuração de linting
- **pyproject.toml**: Configuração do black e isort

### Frontend (React)

- **.eslintrc.js**: Configuração do ESLint
- **package.json**: Scripts de linting e formatação

## Secrets Necessários

Configure os seguintes secrets no GitHub:

- `DOCKER_USERNAME`: Usuário do Docker Hub
- `DOCKER_PASSWORD`: Senha do Docker Hub
- `GITHUB_TOKEN`: Token do GitHub (automático)

## Como Usar

### Desenvolvimento Local

1. Faça suas alterações
2. Execute testes localmente:
   ```bash
   # Backend
   cd api
   python manage.py test
   
   # Frontend
   cd frontend
   npm test
   npm run lint
   ```

3. Commit e push para `develop`
4. O CI executará automaticamente
5. Se passar, o CD staging executará

### Deploy para Produção

1. Merge `develop` para `main`
2. Vá para Actions > CD - Production
3. Clique em "Run workflow"
4. Preencha a versão e ambiente
5. Aprove o deploy

### Atualização de Dependências

1. Vá para Actions > Dependency Update
2. Clique em "Run workflow"
3. Revise o Pull Request criado
4. Teste e merge

## Monitoramento

- **GitHub Actions**: Visualize execuções em Actions
- **GitHub Security**: Vulnerabilidades em Security
- **Docker Hub**: Imagens publicadas
- **Logs**: Logs de deploy nos workflows

## Troubleshooting

### CI Falha
1. Verifique os logs do job que falhou
2. Execute os testes localmente
3. Corrija os problemas
4. Push novamente

### CD Falha
1. Verifique se o CI passou
2. Verifique as credenciais do Docker
3. Verifique a conectividade do ambiente
4. Execute manualmente se necessário

### Dependências Desatualizadas
1. Execute o workflow de atualização
2. Revise as mudanças no PR
3. Teste localmente
4. Merge se tudo estiver OK 