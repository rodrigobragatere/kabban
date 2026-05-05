# Kanban — Demonstração de Alunos

Protótipo simples de quadro Kanban para disciplina de **Engenharia de Requisitos**: catálogo de atividades, três colunas (lista de espera, em curso, concluídos), cartões arrastáveis e inclusão de alunos com atividade escolhida.

## Conteúdo do repositório

| Arquivo | Descrição |
|---------|-----------|
| `kanban-alunos-demo.html` | Estrutura da página e referências a CSS e JS |
| `kanban-alunos-demo.css` | Estilos e tema visual (variáveis CSS, layout responsivo) |
| `kanban-alunos-demo.js` | Lógica: catálogo de atividades, dados demo, drag-and-drop, adicionar cartões |

## Como executar

Não é necessário instalar dependências.

1. Clone ou baixe esta pasta.
2. Abra `kanban-alunos-demo.html` no navegador (duplo clique ou arrastar o arquivo para uma aba).

**Importante:** mantenha `kanban-alunos-demo.css` e `kanban-alunos-demo.js` na mesma pasta que o HTML para estilos e scripts carregarem corretamente.

Opcionalmente, sirva a pasta com um servidor HTTP local se preferir (por exemplo, extensão “Live Server” no VS Code).

## Funcionalidades

- **Quadro de atividades** à esquerda (em ecrãs largos): escolha uma atividade; ela aparece no cartão junto com o nome do aluno.
- Nome do aluno + botão **Adicionar à lista** (Enter no campo também envia): exige atividade selecionada (o painel realça brevemente se faltar).
- Arrastar cartões entre as colunas para acompanhar o progresso.
- Contador de cartões por coluna.
- Dados de **demonstração** pré-carregados (cada aluno já tem uma atividade do catálogo).

## Requisitos

- Navegador moderno com suporte a HTML5 Drag and Drop e CSS Grid.

## Licença

Uso educacional no contexto do laboratório de Engenharia de Requisitos.
