// hooks/usePolynomialSolver.ts
import { useState, useEffect } from 'react';

export type PolynomialCoefficients = {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
};

export type Solution = {
  real: number;
  imag: number;
  isComplex: boolean;
};

const usePolynomialSolver = () => {
  const [degree, setDegree] = useState<number>(3);
  const [coefficients, setCoefficients] = useState<PolynomialCoefficients>({
    a: '3',
    b: '2',
    c: '-5',
    d: '1',
    e: '0',
    f: '0',
  });
  const [equation, setEquation] = useState<string>('3x³ + 2x² - 5x + 1 = 0');
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [error, setError] = useState<string>('');

  // Actualizar un coeficiente específico
  const updateCoefficient = (
    key: keyof PolynomialCoefficients,
    value: string,
  ) => {
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setCoefficients(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // Actualizar la ecuación mostrada
  const updateEquation = () => {
    const coeffs = getCoefficientsAsNumbers();
    const terms: string[] = [];

    for (let i = 0; i <= degree; i++) {
      const coeff = coeffs[i];
      if (coeff !== 0) {
        const power = degree - i;
        let term = '';

        if (coeff !== 1 && coeff !== -1) {
          term += coeff;
        } else if (coeff === -1) {
          term += '-';
        }

        if (power > 0) {
          term += 'x';
          if (power > 1) {
            const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵'];
            term += superscripts[power] || `^${power}`;
          }
        } else if (power === 0 && (coeff === 1 || coeff === -1)) {
          term += '1';
        }

        terms.push(term);
      }
    }

    const equationStr =
      terms.length > 0
        ? terms.join(' + ').replace(/\+ -/g, '- ') + ' = 0'
        : '0 = 0';

    setEquation(equationStr);
  };

  // Obtener coeficientes como números
  const getCoefficientsAsNumbers = (): number[] => {
    const coeffs: number[] = [];

    for (let i = 0; i <= degree; i++) {
      const key = ['a', 'b', 'c', 'd', 'e', 'f'][
        i
      ] as keyof PolynomialCoefficients;
      const value = parseFloat(coefficients[key]) || 0;
      coeffs.push(value);
    }

    return coeffs;
  };

  // Resolver ecuación lineal
  const solveLinear = (a: number, b: number): Solution[] => {
    const solution = -b / a;
    return [{ real: solution, imag: 0, isComplex: false }];
  };

  // Resolver ecuación cuadrática
  const solveQuadratic = (a: number, b: number, c: number): Solution[] => {
    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      const sqrtDisc = Math.sqrt(discriminant);
      const x1 = (-b + sqrtDisc) / (2 * a);
      const x2 = (-b - sqrtDisc) / (2 * a);
      return [
        { real: x1, imag: 0, isComplex: false },
        { real: x2, imag: 0, isComplex: false },
      ];
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      return [{ real: x, imag: 0, isComplex: false }];
    } else {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-discriminant) / (2 * a);
      return [
        { real, imag, isComplex: true },
        { real, imag: -imag, isComplex: true },
      ];
    }
  };

  // Función polinómica para métodos numéricos
  const polynomialFunction =
    (coeffs: number[]) =>
    (x: number): number => {
      let result = 0;
      for (let i = 0; i < coeffs.length; i++) {
        result += coeffs[i] * Math.pow(x, coeffs.length - 1 - i);
      }
      return result;
    };

  // Método de Newton-Raphson
  const newtonRaphson = (
    f: (x: number) => number,
    df: (x: number) => number,
    initialGuess: number,
    tolerance: number = 1e-10,
    maxIterations: number = 1000,
  ): number | null => {
    let x = initialGuess;

    for (let i = 0; i < maxIterations; i++) {
      const fx = f(x);
      const fpx = df(x);

      if (Math.abs(fx) < tolerance) {
        return x;
      }

      if (Math.abs(fpx) < tolerance) {
        break;
      }

      x = x - fx / fpx;
    }

    return null;
  };

  // Derivada del polinomio
  const polynomialDerivative =
    (coeffs: number[]) =>
    (x: number): number => {
      let result = 0;
      for (let i = 0; i < coeffs.length - 1; i++) {
        result +=
          (coeffs.length - 1 - i) *
          coeffs[i] *
          Math.pow(x, coeffs.length - 2 - i);
      }
      return result;
    };

  // Encontrar raíces numéricamente
  const findNumericalRoots = (coeffs: number[]): Solution[] => {
    const roots: number[] = [];
    const tolerance = 1e-5;

    const f = polynomialFunction(coeffs);
    const df = polynomialDerivative(coeffs);

    const initialGuesses = [-10, -5, -2, -1, 0, 1, 2, 5, 10];

    for (const guess of initialGuesses) {
      const root = newtonRaphson(f, df, guess);

      if (root !== null) {
        // Verificar unicidad
        const isUnique = !roots.some(r => Math.abs(r - root) < 0.01);
        if (isUnique && Math.abs(f(root)) < 0.001) {
          roots.push(Number(root.toFixed(5)));
        }
      }

      if (roots.length >= coeffs.length - 1) break;
    }

    return roots.map(real => ({ real, imag: 0, isComplex: false }));
  };

  // Resolver la ecuación
  const solve = (): boolean => {
    setError('');

    const coeffs = getCoefficientsAsNumbers();

    // Validar coeficiente principal
    if (coeffs[0] === 0) {
      setError('El coeficiente principal (a) no puede ser cero.');
      return false;
    }

    let newSolutions: Solution[] = [];

    try {
      if (degree === 1) {
        newSolutions = solveLinear(coeffs[0], coeffs[1]);
      } else if (degree === 2) {
        newSolutions = solveQuadratic(coeffs[0], coeffs[1], coeffs[2]);
      } else {
        newSolutions = findNumericalRoots(coeffs);
      }

      setSolutions(newSolutions);
      return true;
    } catch (err) {
      setError('Error al resolver la ecuación. Verifica los coeficientes.');
      return false;
    }
  };

  // Limpiar todos los campos
  const clear = () => {
    setCoefficients({
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
    });
    setSolutions([]);
    setError('');
    setEquation('0 = 0');
  };

  // Formatear resultados como texto
  const formatSolutions = (): string => {
    if (solutions.length === 0) {
      return error || 'No se han calculado soluciones.';
    }

    return `Soluciones encontradas:\n${solutions
      .map((sol, idx) => {
        if (sol.isComplex) {
          const realStr = sol.real.toFixed(3);
          const imagStr = Math.abs(sol.imag).toFixed(3);
          const sign = sol.imag >= 0 ? '+' : '-';
          return `x${idx + 1} = ${realStr} ${sign} ${imagStr}i`;
        } else {
          return `x${idx + 1} = ${sol.real.toFixed(5)}`;
        }
      })
      .join('\n')}`;
  };

  // Actualizar ecuación cuando cambian coeficientes o grado
  useEffect(() => {
    updateEquation();
  }, [coefficients, degree]);

  return {
    degree,
    setDegree,
    coefficients,
    updateCoefficient,
    equation,
    solutions,
    error,
    solve,
    clear,
    formatSolutions,
    getCoefficientsAsNumbers,
  };
};

export default usePolynomialSolver;
