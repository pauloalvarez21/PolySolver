import { findBestLanguageTag } from 'react-native-localize';

const getSystemLanguage = (): string => {
  // Use react-native-localize to find the best match between supported languages
  const bestLanguage = findBestLanguageTag(['es', 'en']);

  // Requirement: if 'es', show Spanish, otherwise English
  return bestLanguage?.languageTag === 'es' ? 'es' : 'en';
};

const systemLang = getSystemLanguage();

interface TranslationKeys {
  appTitle: string;
  navHome: string;
  navOperation: string;
  navInfo: string;
  homeSubtitle: string;
  howItWorks: string;
  howItWorksDesc: string;
  step1: string;
  step2: string;
  step3: string;
  whatIsGraph: string;
  whatIsGraphDesc: string;
  whatIsItFor: string;
  graphBenefit1: string;
  graphBenefit2: string;
  graphBenefit3: string;
  startSolving: string;
  homeFooterRights: string;
  homeFooterTool: string;
  homeFooterVersion: string;
  calculateRoots: string;
  settings: string;
  equationDegree: string;
  solve: string;
  clear: string;
  results: string;
  noSolutions: string;
  infoTitle: string;
  infoSubtitle: string;
  whatAreEquations: string;
  equationsDesc: string;
  whyCreated: string;
  whyCreatedDesc: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  historyDesc: string;
  knowMore: string;
  knowMoreDesc: string;
  viewWiki: string;
  quote: string;
  chartTitle: string;
}

const translations: { es: TranslationKeys; en: TranslationKeys } = {
  es: {
    // General
    appTitle: 'PolySolver',
    navHome: 'Inicio',
    navOperation: 'Operar',
    navInfo: 'Info',

    // HomeScreen
    homeSubtitle: 'Tu aliado matemático avanzado',
    howItWorks: '¿Cómo funciona?',
    howItWorksDesc:
      'PolySolver es una herramienta diseñada para resolver ecuaciones polinómicas de forma rápida y precisa. Solo necesitas:',
    step1: 'Seleccionar el grado del polinomio (1-5).',
    step2: 'Ingresar los coeficientes de la ecuación.',
    step3: 'Presionar "Solve" para obtener las raíces reales y complejas.',
    whatIsGraph: '¿Qué es el Gráfico?',
    whatIsGraphDesc:
      'Es una representación visual de tu ecuación en un plano bidimensional. Muestra cómo varía el valor de "y" a medida que cambia "x" según tu polinomio.',
    whatIsItFor: '¿Para qué sirve?',
    graphBenefit1:
      'Visualización de Raíces: Los puntos donde la curva corta al eje X son las raíces reales.',
    graphBenefit2:
      'Comportamiento: Permite entender si la función crece o decrece y ver sus puntos de inflexión.',
    graphBenefit3:
      'Análisis: Facilita la comprensión de la tendencia de la función en diferentes intervalos.',
    startSolving: 'Comenzar a Resolver',
    homeFooterRights: '© 2026 Gaelectronica. Todos los derechos reservados.',
    homeFooterTool: 'Herramienta desarrollada por el Gaelectronica.',
    homeFooterVersion: 'v1.0.0',

    // OperationScreen
    calculateRoots: 'Calcular Raíces',
    settings: 'Ajustes',
    equationDegree: 'Grado de la Ecuación',
    solve: 'Resolver',
    clear: 'Limpiar',
    results: 'Resultados',
    noSolutions: 'No se encontraron soluciones.',

    // InfoScreen
    infoTitle: 'Información',
    infoSubtitle: 'Aprende sobre el poder de las matemáticas',
    whatAreEquations: '¿Qué son las ecuaciones?',
    equationsDesc:
      'Una ecuación es una igualdad matemática entre dos expresiones, denominadas miembros y separadas por el signo igual, en las que aparecen elementos conocidos y datos desconocidos o incógnitas, relacionados mediante operaciones matemáticas.',
    whyCreated: '¿Por qué se crearon?',
    whyCreatedDesc:
      'Las ecuaciones surgieron de la necesidad humana de resolver problemas prácticos del día a día, como:',
    bullet1: 'Medición de terrenos y arquitectura.',
    bullet2: 'Cálculo de impuestos y transacciones comerciales.',
    bullet3: 'Predicción de eventos astronómicos y físicos.',
    historyDesc:
      'A lo largo de los siglos, desde los babilonios hasta los matemáticos modernos, las ecuaciones han permitido modelar el universo y avanzar en la tecnología.',
    knowMore: 'Saber más',
    knowMoreDesc:
      'Si deseas profundizar en la historia, los tipos de ecuaciones y su impacto en la ciencia moderna, puedes visitar la enciclopedia libre.',
    viewWiki: 'Ver en Wikipedia',
    quote:
      '"Las matemáticas son el lenguaje con el que Dios ha escrito el universo." — Galileo Galilei',

    // Chart
    chartTitle: 'Visualización del Polinomio',
  },
  en: {
    // General
    appTitle: 'PolySolver',
    navHome: 'Home',
    navOperation: 'Solve',
    navInfo: 'Info',

    // HomeScreen
    homeSubtitle: 'Your advanced mathematical ally',
    howItWorks: 'How it works?',
    howItWorksDesc:
      'PolySolver is a tool designed to solve polynomial equations quickly and accurately. You just need to:',
    step1: 'Select the polynomial degree (1-5).',
    step2: 'Enter the equation coefficients.',
    step3: 'Press "Solve" to get real and complex roots.',
    whatIsGraph: 'What is the Graph?',
    whatIsGraphDesc:
      'It is a visual representation of your equation on a 2D plane. It shows how the value of "y" changes as "x" changes according to your polynomial.',
    whatIsItFor: 'What is it for?',
    graphBenefit1:
      'Root Visualization: Points where the curve crosses the X-axis are real roots.',
    graphBenefit2:
      'Behavior: Allows understanding if the function increases or decreases and seeing its inflection points.',
    graphBenefit3:
      'Analysis: Facilitates the understanding of the function trend in different intervals.',
    startSolving: 'Start Solving',
    homeFooterRights: '© 2026 Gaelectronica. All rights reserved.',
    homeFooterTool: 'Tool developed by the Gaelectronica.',
    homeFooterVersion: 'v1.0.0',

    // OperationScreen
    calculateRoots: 'Calculate Roots',
    settings: 'Settings',
    equationDegree: 'Equation Degree',
    solve: 'Solve',
    clear: 'Clear',
    results: 'Results',
    noSolutions: 'No solutions found.',

    // InfoScreen
    infoTitle: 'Information',
    infoSubtitle: 'Learn about the power of mathematics',
    whatAreEquations: 'What are equations?',
    equationsDesc:
      'An equation is a mathematical equality between two expressions, called members and separated by the equal sign, in which known elements and unknown data or variables appear, related through mathematical operations.',
    whyCreated: 'Why were they created?',
    whyCreatedDesc:
      'Equations arose from the human need to solve practical day-to-day problems, such as:',
    bullet1: 'Land measurement and architecture.',
    bullet2: 'Tax calculation and business transactions.',
    bullet3: 'Prediction of astronomical and physical events.',
    historyDesc:
      'Throughout the centuries, from the Babylonians to modern mathematicians, equations have allowed modeling the universe and advancing technology.',
    knowMore: 'Know more',
    knowMoreDesc:
      'If you want to delve deeper into history, types of equations, and their impact on modern science, you can visit the free encyclopedia.',
    viewWiki: 'View on Wikipedia',
    quote:
      '"Mathematics is the language with which God has written the universe." — Galileo Galilei',

    // Chart
    chartTitle: 'Polynomial Visualization',
  },
};

export const t: TranslationKeys =
  systemLang === 'es' ? translations.es : translations.en;
export default translations;
