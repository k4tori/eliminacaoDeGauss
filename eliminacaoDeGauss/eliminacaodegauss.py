def gauss_seidel(coefficients, constants, initial_values, max_iterations, tolerance):
    n = len(coefficients)
    solution = list(initial_values)
    prev_solution = list(initial_values)

    for _ in range(max_iterations):
        for i in range(n):
            summation = constants[i]
            for j in range(n):
                if j != i:
                    summation -= coefficients[i][j] * solution[j]
            solution[i] = summation / coefficients[i][i]

        has_converged = True
        for i in range(n):
            error = abs(solution[i] - prev_solution[i])
            if error > tolerance:
                has_converged = False
                break

        if has_converged:
            print("Converged at iteration", _ + 1)
            break

        prev_solution = list(solution)

    return solution

def main():
    n = int(input("Número de equações: "))

    coefficients = []
    constants = []
    initial_values = []

    print("Digite os coeficientes das equações:")
    for i in range(n):
        row = []
        for j in range(n):
            coefficient = float(input("a{}{}: ".format(i + 1, j + 1)))
            row.append(coefficient)
        coefficients.append(row)

        constant = float(input("b{}: ".format(i + 1)))
        constants.append(constant)

        initial_value = float(input("Valor inicial x{}: ".format(i + 1)))
        initial_values.append(initial_value)

    max_iterations = int(input("Número máximo de iterações: "))
    tolerance = float(input("Tolerância: "))

    solution = gauss_seidel(coefficients, constants, initial_values, max_iterations, tolerance)

    print("Solução:")
    for i in range(len(solution)):
        print("x{} = {:.4f}".format(i + 1, solution[i]))

if __name__ == '__main__':
    main()