/*
Criei um algoritmo, em JavaScript, para encontrar o caminho mais curto em um labirinto. 
O labirinto é representado por uma matriz binária (1 para caminho e 0 para parede). 
Foi usado busca em largura (BFS) para garantir que a menor distância seja encontrada.
Os testes unitários devem cobrir os casos:
- Matriz inválida: linhas de tamanhos diferentes; 
- Matriz inválida: valores fora do padrão 0 ou 1; 
- Ponto de início inválido (parede); 
- Ponto final inválido (parede); 
- Matriz completamente bloqueada (sem caminhos); 
- ponto de início igual ao ponto final; 
- Caminho mais curto entre o ponto de início e o ponto final.
*/                                                          

class Labirinto {
    constructor(labirinto, inicio, fim) {
        this.labirinto = labirinto;
        this.inicio = inicio;
        this.fim = fim;
        this.linhas = labirinto.length;
        this.colunas = labirinto[0].length;

        // Verificar se a matriz é válida
        if (!this.isMatrizValida()) {
            throw new Error("A matriz do labirinto é inválida.");
        }

        // Verificar se o ponto de início e fim são válidos
        if (!this.ehPosicaoValida(inicio)) {
            throw new Error(`Ponto de início inválido: (${inicio[0]}, ${inicio[1]}) é uma parede.`);
        }

        if (!this.ehPosicaoValida(fim)) {
            throw new Error(`Ponto final inválido: (${fim[0]}, ${fim[1]}) é uma parede.`);
        }
    }

    // Verifica se a matriz é válida (linhas de tamanho igual e valores 0 ou 1)
    isMatrizValida() {
        const numColunas = this.labirinto[0].length;

        // Verificar se todas as linhas têm o mesmo número de colunas
        for (let i = 1; i < this.linhas; i++) {
            if (this.labirinto[i].length !== numColunas) {
                return false;
            }
        }

        // Verificar se todos os valores são 0 ou 1
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                if (this.labirinto[i][j] !== 0 && this.labirinto[i][j] !== 1) {
                    return false;
                }
            }
        }

        // Verificar se a matriz não é completamente bloqueada
        let totalCaminho = 0;
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                if (this.labirinto[i][j] === 1) {
                    totalCaminho++;
                }
            }
        }

        if (totalCaminho === 0) {
            throw new Error("A matriz é completamente bloqueada, não há caminhos disponíveis.");
        }

        return true;
    }

    // Verifica se uma posição é válida (não é uma parede)
    ehPosicaoValida([x, y]) {
        return x >= 0 && x < this.linhas && y >= 0 && y < this.colunas && this.labirinto[x][y] === 1;
    }

    // Resolver o labirinto usando BFS
    resolver() {
        // Verificar se o ponto de início é igual ao ponto final
        if (this.inicio[0] === this.fim[0] && this.inicio[1] === this.fim[1]) {
            return 0; // Não há necessidade de movimento
        }

        const fila = [[this.inicio[0], this.inicio[1], 0]];
        const visitado = Array.from({ length: this.linhas }, () => Array(this.colunas).fill(false));
        visitado[this.inicio[0]][this.inicio[1]] = true;

        const direcoes = [
            [-1, 0], // cima
            [1, 0],  // baixo
            [0, -1], // esquerda
            [0, 1],  // direita
        ];

        while (fila.length > 0) {
            const [x, y, distancia] = fila.shift();

            if (x === this.fim[0] && y === this.fim[1]) {
                return distancia;
            }

            for (const [dx, dy] of direcoes) {
                const novoX = x + dx;
                const novoY = y + dy;

                if (this.ehPosicaoValida([novoX, novoY]) && !visitado[novoX][novoY]) {
                    visitado[novoX][novoY] = true;
                    fila.push([novoX, novoY, distancia + 1]);
                }
            }
        }

        return -1; // Não encontrou o caminho
    }
}

module.exports = Labirinto; // Exporte a classe para ser usada nos testes
