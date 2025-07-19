const url = "/data/movies.json";

export async function getData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Não consegui carregar os filmes.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // TODO: mostrar uma mensagem quando não conseguir carregar os arquivos
        console.error("Erro na requisição:", error);
        return [];
    }
}
