# movie-summary

Aplicação web para explorar filmes usando a API do TMDB.

O foco do projeto é arquitetura correta, separação de responsabilidades e uso de boas práticas. O backend controla autenticação e sessão; o frontend consome apenas o backend.

---

## Objetivo

-   Listar filmes populares, em alta e por busca
-   Exibir detalhes de filmes
-   Permitir login via TMDB
-   Gerenciar sessão do usuário
-   Trabalhar com favoritos e watchlist

Não é um clone visual. É um projeto técnico.

---

## Escopo

Incluído:

-   Autenticação via TMDB
-   Consumo da API do TMDB através do backend
-   Organização clara de rotas e fluxos
-   Frontend focado apenas em UI e estado

Fora do escopo:

-   Sistema de pagamento
-   Upload de conteúdo
-   Comentários ou avaliações próprias
-   Backend complexo com regras de negócio pesadas

---

## Arquitetura

-   Frontend: responsável apenas por interface e interação do usuário
-   Backend: responsável por:

    -   autenticação
    -   criação e controle de sessão
    -   proxy da API do TMDB

O frontend nunca se comunica diretamente com o TMDB.

---

## Tecnologias

Frontend:

-   React
-   TypeScript
-   Tailwind CSS

Backend:

-   Node.js
-   API REST

Outros:

-   TMDB API
-   Variáveis de ambiente para chaves e tokens

---

## Organização do Projeto

-   Autenticação isolada do restante da aplicação
-   Rotas divididas por domínio (auth, user, movies, lists)
-   Uma ação do usuário corresponde a uma ação clara no backend

---

## Licença

Uso pessoal e educacional.

Não é permitido copiar, redistribuir ou utilizar este projeto, no todo ou em partes, para fins comerciais ou como base de outro projeto público sem autorização do autor.

---

## Observações

Este projeto existe para aprendizado real. Decisões de arquitetura são mais importantes do que aparência.
