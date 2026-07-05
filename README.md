# 4 Irmãos — site institucional

Landing page da 4 Irmãos Materiais de Construção e Ferragens (Manaus-AM), construída com Next.js 16 (App Router).

## Requisitos

- Node.js 20.9 ou superior
- Uma conta [Resend](https://resend.com) com domínio verificado, para o envio de e-mails de candidatura

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (usada em metadata, sitemap e robots.txt) |
| `RESEND_API_KEY` | Chave de API da Resend, usada para enviar as candidaturas do formulário "Trabalhe conosco" |
| `CAREER_NOTIFICATION_EMAIL` | Caixa de entrada que recebe as candidaturas |
| `CAREER_FROM_EMAIL` | Endereço remetente (precisa estar em um domínio verificado na Resend) |

Sem essas variáveis configuradas, o endpoint `/api/curriculo` responde com erro e o formulário cai automaticamente no fluxo de fallback via WhatsApp.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build e lint

```bash
npm run build
npm run lint
```

## Docker

O projeto usa `output: "standalone"` para gerar uma imagem de produção mínima.

```bash
# build da imagem
docker compose build

# subir o container (lê variáveis de .env)
docker compose up -d

# ver logs
docker compose logs -f web
```

O container expõe a porta `3000` e tem um healthcheck em `GET /api/health`.

Para rodar sem docker-compose:

```bash
docker build -t 4irmaos-site --build-arg NEXT_PUBLIC_SITE_URL=https://www.4irmaosconstrucao.com.br .
docker run --rm -p 3000:3000 --env-file .env 4irmaos-site
```

## Estrutura

- `app/page.tsx` — conteúdo da landing page (hero, categorias, lojas, história, formulário)
- `app/curriculo-upload.tsx` — formulário "Trabalhe conosco", envia para `/api/curriculo` com fallback via WhatsApp
- `app/api/curriculo/route.ts` — recebe o formulário, valida e envia o currículo em PDF por e-mail via Resend
- `app/api/health/route.ts` — endpoint de healthcheck para o container
