/*
Testes de Validação da Matriz:
O primeiro teste verifica se a matriz tem linhas desiguais.
O segundo teste verifica se a matriz contém valores fora do padrão 0 ou 1.
O terceiro e quarto testes verificam se os pontos de início e fim são válidos, ou seja, se não estão em uma parede (0).

Testes de Funcionalidade do Algoritmo:
O quinto teste verifica se o código retorna 0 quando o ponto de início é igual ao ponto final.
O sexto teste verifica se o algoritmo encontra o caminho mais curto entre o ponto de início e o ponto final.
O sétimo teste verifica se o código lança um erro se a matriz for completamente bloqueada, ou seja, não houver nenhum caminho.
*/

const Labirinto = require('../src/labirinto'); // Importando a classe Labirinto

describe('Labirinto', () => {

    test('deve lançar erro para matriz inválida (linhas desiguais)', () => {
        const labirintoInvalido = [
            [1, 0, 1],
            [0, 1],  // Linha com número de colunas diferente
            [1, 1, 0]
        ];

        const inicio = [0, 0];
        const fim = [2, 2];

        expect(() => {
            new Labirinto(labirintoInvalido, inicio, fim);
        }).toThrow('A matriz do labirinto é inválida.');
    });

    test('deve lançar erro para matriz inválida (valores fora do padrão 0 ou 1)', () => {
        const labirintoInvalido = [
            [1, 0, 1],
            [0, 1, -1],  // Valor inválido (-1)
            [1, 1, 0]
        ];

        const inicio = [0, 0];
        const fim = [2, 2];

        expect(() => {
            new Labirinto(labirintoInvalido, inicio, fim);
        }).toThrow('A matriz do labirinto é inválida.');
    });

    test('deve lançar erro para ponto de início inválido', () => {
        const labirinto = [
            [1, 0, 1],
            [0, 1, 0],
            [1, 1, 1]
        ];

        const inicio = [1, 0]; // Ponto de início é uma parede
        const fim = [2, 2];

        expect(() => {
            new Labirinto(labirinto, inicio, fim);
        }).toThrow('Ponto de início inválido: (1, 0) é uma parede.');
    });

    test('deve lançar erro para ponto de fim inválido', () => {
        const labirinto = [
            [1, 0, 1],
            [0, 1, 0],
            [1, 1, 1]
        ];

        const inicio = [0, 0];
        const fim = [1, 0]; // Ponto final é uma parede

        expect(() => {
            new Labirinto(labirinto, inicio, fim);
        }).toThrow('Ponto final inválido: (1, 0) é uma parede.');
    });
    
    test('deve retornar 0 quando o ponto de início for igual ao ponto final', () => {
        const labirinto = [
            [1, 1, 1, 0],
            [1, 1, 0, 1],
            [1, 1, 1, 1],
            [0, 1, 1, 1]
        ];

        const inicio = [0, 0];
        const fim = [0, 0]; // Ponto de início e fim são iguais

        const lab = new Labirinto(labirinto, inicio, fim);
        expect(lab.resolver()).toBe(0); // Não há necessidade de movimento
    });

    test('deve retornar o caminho mais curto', () => {
        const labirinto = [
            [1, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 1],
            [1, 1, 1, 1]
        ];

        const inicio = [0, 0];
        const fim = [3, 3];

        const lab = new Labirinto(labirinto, inicio, fim);
        expect(lab.resolver()).toBe(6); // O caminho mais curto é de 6 passos
    });

    test('deve lançar erro se a matriz for completamente bloqueada', () => {
        const labirintoBloqueado = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        const inicio = [0, 0];
        const fim = [2, 2];

        expect(() => {
            new Labirinto(labirintoBloqueado, inicio, fim);
        }).toThrow('A matriz é completamente bloqueada, não há caminhos disponíveis.');
    });

});

