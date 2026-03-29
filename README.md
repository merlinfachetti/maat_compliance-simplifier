# Ma'at Compliance Simplifier

Ma'at is a focused compliance product that transforms dense legal and bureaucratic text into clear actions, deadlines, and risks for freelancers, expats, founders, and small businesses.

## Visao do produto

Ma'at existe para resolver um problema simples e caro: pessoas recebem documentos legais, regulatorios ou burocraticos e nao conseguem entender com rapidez o que aquilo significa, o que precisam fazer agora, qual o prazo real e qual o risco de ignorar.

O produto nao deve parecer um "chat com IA". Ele deve se comportar como uma camada de interpretacao e acao, com uma experiencia clara, calma e focada em decisao.

## Problema que resolve

- linguagem legal e burocratica e densa
- prazos e urgencia ficam escondidos no meio do texto
- usuarios nao sabem qual acao priorizar
- erros de interpretacao podem custar multas, atrasos ou escalacao

## Proposta de valor

Ma'at transforma um texto confuso em um relatorio estruturado com:
- resumo em linguagem simples
- urgencia
- prazo
- acoes recomendadas
- riscos se ignorado
- ambiguidades e limites
- disclaimer explicito

## O que o produto e

- um simplificador de compliance
- uma camada de interpretacao para textos legais e regulatorios
- um produto action-first para momentos de duvida e urgencia

## O que o produto nao e

- nao e consultoria juridica
- nao e escritorio de advocacia
- nao e um cofre de documentos no MVP
- nao e uma plataforma completa de gestao de compliance no dia 1

## Publico-alvo inicial

- expats lidando com burocracia na Europa
- freelancers recebendo avisos fiscais, tributarios ou cadastrais
- founders early-stage e microempresas sem suporte juridico interno

## Como o produto funciona

1. O usuario cola o texto ou envia o documento.
2. O sistema identifica obrigacao, urgencia, prazo e risco.
3. O produto devolve um relatorio estruturado em vez de uma conversa longa.
4. O usuario sai com clareza sobre o que fazer e onde ainda precisa de revisao profissional.

## Entrega de valor do MVP

O MVP deve ser capaz de fazer uma coisa muito bem:

**Receber um aviso burocratico ou regulatorio e devolver um relatorio acionavel em menos de 60 segundos.**

## Estado atual do repositorio

Hoje este repositorio contem:
- documentacao de produto em [`docs/`](./docs)
- landing page do produto em [`src/app/page.tsx`](./src/app/page.tsx)
- fluxo inicial de produto em [`src/app/analyze/page.tsx`](./src/app/analyze/page.tsx)
- rota mock de analise em [`src/app/api/analyze/route.ts`](./src/app/api/analyze/route.ts)
- contrato estruturado da analise em [`src/lib/analysis.ts`](./src/lib/analysis.ts)

## Stack atual

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- App Router

## Como rodar localmente

Instale dependencias e rode o servidor:

```bash
npm install
npm run dev
```

Depois abra [http://localhost:3000](http://localhost:3000).

## Validacao local

Comandos principais:

```bash
npm run lint
npx next build --webpack
```

`--webpack` foi usado no build para evitar limitacoes do ambiente de sandbox com o Turbopack durante a validacao local.

## Estrutura principal

```text
docs/                    produto, fundamento e roadmap
public/                  assets servidos pela aplicacao
src/app/page.tsx         landing page
src/app/analyze/page.tsx fluxo inicial do produto
src/app/api/analyze      rota de analise mock
src/components/          componentes visuais reutilizaveis
src/lib/analysis.ts      schema e mock da analise
```

## Roadmap estimado

1. Landing page forte e posicionamento claro
2. Fluxo inicial do produto
3. Integracao real com LLM e schema estruturado
4. Upload e extracao de PDF
5. Pricing e pay-per-analysis
6. Deploy e validacao com usuarios reais

## Proximas etapas de desenvolvimento

As proximas etapas recomendadas sao:

1. Substituir o mock por analise real com LLM
2. Criar schema confiavel para output estruturado
3. Adicionar tratamento de erro e ambiguidade
4. Habilitar upload de PDF
5. Inserir checkpoint de monetizacao

## Referencias de produto

- [Build roadmap](./docs/01_build_roadmap.md)
- [Compliance foundation](./docs/02_maat_compliance_foundation.md)
- [Execution plan](./docs/02_compliance_execution.md)
