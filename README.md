# Via Norte Hotel — site

Site estático (HTML, CSS e JavaScript puros), com o visual do modelo "Lindqvist" do Lovable
e o conteúdo de vianortehotel.com.br.

## Como abrir

Dê dois cliques em `index.html`. Não precisa instalar nada.

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Início: capa, apresentação, apartamentos, estrutura, galeria, tarifas e dúvidas |
| `acomodacoes.html` | Os 5 apartamentos com filtro e a tabela de tarifas |
| `quarto.html?id=casal` | Página de cada apartamento (`single`, `casal-individual`, `casal`, `duplo`, `familia`) |
| `sobre.html` | História e regras da estadia |
| `contato.html` | Reservas, formulário que abre o WhatsApp e localização |

## Onde mudar as coisas

- **Preços, apartamentos, telefones, WhatsApp e endereço:** `assets/js/dados.js`. O cabeçalho,
  o rodapé e as páginas de apartamento são montados a partir desse arquivo.
- **Textos das seções:** direto no HTML de cada página.
- **Cores, fontes e espaçamentos:** no topo de `assets/css/site.css` (variáveis em `:root`).
- **Fotos:** `assets/img/`.

## Publicar

Basta enviar a pasta inteira para a hospedagem (a mesma do site atual, por FTP), ou para
Netlify, Vercel ou GitHub Pages.
