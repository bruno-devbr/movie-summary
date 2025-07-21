// URL do arquivo JSON com os dados dos filmes
const url = "/data/movies.json";

// Função assíncrona que busca os dados do JSON
export async function getData() {
    try {
        const response = await fetch(url);

        // Verifica se a resposta foi ok (status 200-299)
        if (!response.ok) {
            throw new Error("Não consegui carregar os filmes.");
        }

        // Converte a resposta para JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Caso dê erro, exibe no console e retorna array vazio
        console.error("Erro na requisição:", error);
        return [];
    }
}
