def main():
    nuloNum = 1e-5
    tamanhoVetor = int(input("Digite o tamanho do vetor: "))

    A = []
    igual = []

    print("Digite os valores da matriz A:")
    for i in range(tamanhoVetor):
        linha = []
        for j in range(tamanhoVetor):
            elemento = float(input())
            linha.append(elemento)
        A.append(linha)

    print("Digite os valores do vetor igual:")
    for i in range(tamanhoVetor):
        elemento = float(input())
        igual.append(elemento)

    x = linear_s(A, igual)
    num = 1

    # Imprimir as soluções
    for i in range(tamanhoVetor):
        print(f'x{num} = {x[i]:.4f}')
        num += 1


def linear_s(A, b):
    n = len(b)

    for p in range(n):

        max_index = p
        for i in range(p + 1, n):
            if abs(A[i][p]) > abs(A[max_index][p]):
                max_index = i
        A[p], A[max_index] = A[max_index], A[p]
        b[p], b[max_index] = b[max_index], b[p]

        if abs(A[p][p]) <= nuloNum:
            raise ArithmeticError("Determinante é 0")

        for i in range(p + 1, n):
            alpha = A[i][p] / A[p][p]
            b[i] -= alpha * b[p]
            for j in range(p, n):
                A[i][j] -= alpha * A[p][j]

    x = [0] * n
    for i in range(n - 1, -1, -1):
        sum = 0.0
        for j in range(i + 1, n):
            sum += A[i][j] * x[j]
        x[i] = (b[i] - sum) / A[i][i]
    return x


if __name__ == "__main__":
    main()
