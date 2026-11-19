# Patrulha Echo · Guia de Campo (EVO Missions)

App web instalável (PWA) para os staffs de patrulha: registro do CAV por participante e atividade, guia rápido de perguntas (CNV), ocorrências e relatórios em PDF/Word.

- **Funciona offline**: depois de aberto uma vez com internet e adicionado à Tela de Início (iPhone: Safari → Compartilhar → Adicionar à Tela de Início; Android: Chrome → Instalar app).
- **Sem dados pessoais no repositório**: a lista de alunos é importada no app (arquivo `.json`) e fica só no aparelho de cada staff (localStorage).
- **Deploy**: site estático, sem build. No Vercel: *Add New → Project → Import* este repositório → *Deploy*.

Arquivos: `index.html` (app completo, com jsPDF embutido), `sw.js` (cache offline), `manifest.webmanifest` e ícones.
