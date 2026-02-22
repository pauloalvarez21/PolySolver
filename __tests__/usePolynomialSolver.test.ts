import { renderHook, act } from '@testing-library/react-native';
import usePolynomialSolver from '../src/hooks/usePolynomialSolver';

describe('usePolynomialSolver Hook', () => {
  it('should solve a quadratic equation with two real roots', () => {
    // ARRANGE: Renderiza el hook para poder acceder a sus funciones y estado.
    const { result } = renderHook(() => usePolynomialSolver());

    // ACT: Configuramos el estado del hook para la ecuación x² + 3x - 4 = 0.
    // Usamos `act` porque estamos cambiando el estado del hook.
    act(() => {
      result.current.setDegree(2);
      result.current.updateCoefficient('a', '1');
      result.current.updateCoefficient('b', '3');
      result.current.updateCoefficient('c', '-4');
    });

    // ACT: Ejecutamos la función principal de resolución.
    act(() => {
      result.current.solve();
    });

    // ASSERT: Verificamos que las soluciones sean correctas (1 y -4).
    // Como el orden de las raíces puede variar, las extraemos y ordenamos antes de comparar.
    const roots = result.current.solutions.map(s => s.real).sort((a, b) => a - b);
    expect(roots).toEqual([-4, 1]);
    expect(result.current.error).toBe('');
  });

  it('should solve a quadratic equation with complex roots', () => {
    // ARRANGE
    const { result } = renderHook(() => usePolynomialSolver());

    // ACT: Configuramos para x² + 2x + 5 = 0 (raíces: -1 ± 2i)
    act(() => {
      result.current.setDegree(2);
      result.current.updateCoefficient('a', '1');
      result.current.updateCoefficient('b', '2');
      result.current.updateCoefficient('c', '5');
    });

    act(() => {
      result.current.solve();
    });

    // ASSERT: Verificamos las partes real e imaginaria de las raíces complejas.
    // Usamos `toBeCloseTo` para evitar problemas de precisión con números decimales.
    expect(result.current.solutions.length).toBe(2);
    expect(result.current.solutions[0].isComplex).toBe(true);
    expect(result.current.solutions[0].real).toBeCloseTo(-1);
    expect(Math.abs(result.current.solutions[0].imag)).toBeCloseTo(2); // Comparamos el valor absoluto
    expect(result.current.solutions[1].real).toBeCloseTo(-1);
    expect(Math.abs(result.current.solutions[1].imag)).toBeCloseTo(2);
    expect(result.current.error).toBe('');
  });

  it('should solve a quadratic equation with one real root (double root)', () => {
    // ARRANGE
    const { result } = renderHook(() => usePolynomialSolver());

    // ACT: Configuramos para x² - 2x + 1 = 0 (raíz: 1)
    act(() => {
      result.current.setDegree(2);
      result.current.updateCoefficient('a', '1');
      result.current.updateCoefficient('b', '-2');
      result.current.updateCoefficient('c', '1');
    });

    act(() => {
      result.current.solve();
    });

    // ASSERT
    expect(result.current.solutions.length).toBe(1);
    expect(result.current.solutions[0].real).toBeCloseTo(1);
    expect(result.current.solutions[0].isComplex).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('should solve a linear equation', () => {
    // ARRANGE
    const { result } = renderHook(() => usePolynomialSolver());

    // ACT: Configuramos para 2x - 10 = 0 (raíz: 5)
    act(() => {
      result.current.setDegree(1);
      result.current.updateCoefficient('a', '2');
      result.current.updateCoefficient('b', '-10');
    });

    act(() => {
      result.current.solve();
    });

    // ASSERT
    expect(result.current.solutions.length).toBe(1);
    expect(result.current.solutions[0].real).toBeCloseTo(5);
    expect(result.current.error).toBe('');
  });

  it('should set an error if the leading coefficient is zero', () => {
    // ARRANGE
    const { result } = renderHook(() => usePolynomialSolver());

    // ACT: Configuramos para 0x² + 2x + 5 = 0
    act(() => {
      result.current.setDegree(2);
      result.current.updateCoefficient('a', '0');
    });

    // ACT: Intentamos resolver y guardamos el resultado booleano de la función.
    let solveWasSuccessful;
    act(() => {
      solveWasSuccessful = result.current.solve();
    });

    // ASSERT
    expect(solveWasSuccessful).toBe(false);
    expect(result.current.error).toBe('El coeficiente principal (a) no puede ser cero.');
    expect(result.current.solutions.length).toBe(0);
  });

  it('should clear all fields when clear() is called', () => {
    // ARRANGE: Ponemos el hook en un estado "sucio"
    const { result } = renderHook(() => usePolynomialSolver());
    act(() => {
      result.current.updateCoefficient('a', '1');
      result.current.solve();
    });
    expect(result.current.solutions.length).not.toBe(0); // Verificamos que no está limpio

    // ACT: Llamamos a la función de limpieza
    act(() => {
      result.current.clear();
    });

    // ASSERT: Verificamos que el estado se haya reseteado
    expect(result.current.solutions.length).toBe(0);
    expect(result.current.graphData.length).toBe(0);
    expect(result.current.error).toBe('');
    expect(result.current.coefficients.a).toBe('');
    expect(result.current.equation).toBe('0 = 0');
  });
});