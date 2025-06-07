import { SchoolExercise } from '../types/school-exercise';

export const schoolExercises: SchoolExercise[] = [
  // Português - 1º ano
  {
    id: 1,
    title: 'Identificação de Vogais',
    grade: '1º ano',
    subject: 'Português',
    description: 'Identifique as vogais nas palavras apresentadas.',
    questions: [
      {
        id: 1,
        question: 'Quantas vogais tem a palavra "CASA"?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        imageUrl: null
      },
      {
        id: 2,
        question: 'Quais são as vogais da palavra "BOLA"?',
        options: ['B e L', 'O e A', 'B e O', 'L e A'],
        correctAnswer: 'O e A',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Qual palavra tem mais vogais?',
        options: ['PAI', 'MENINA', 'SOL', 'LUA'],
        correctAnswer: 'MENINA',
        imageUrl: null
      }
    ],
    difficulty: 'fácil'
  },
  {
    id: 2,
    title: 'Formação de Palavras',
    grade: '1º ano',
    subject: 'Português',
    description: 'Forme palavras juntando as sílabas.',
    questions: [
      {
        id: 1,
        question: 'Qual palavra podemos formar com as sílabas "BO" e "LA"?',
        options: ['LOBO', 'BOLO', 'BOLA', 'LATA'],
        correctAnswer: 'BOLA',
        imageUrl: null
      },
      {
        id: 2,
        question: 'Juntando "CA" e "SA" formamos:',
        options: ['SACO', 'CASA', 'CASO', 'SACA'],
        correctAnswer: 'CASA',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Quais sílabas formam a palavra "PATO"?',
        options: ['PA-TI', 'PO-TO', 'PA-TO', 'PE-TE'],
        correctAnswer: 'PA-TO',
        imageUrl: null
      }
    ],
    difficulty: 'fácil'
  },
  
  // Matemática - 1º ano
  {
    id: 3,
    title: 'Contagem até 10',
    grade: '1º ano',
    subject: 'Matemática',
    description: 'Conte os objetos e escolha o número correto.',
    questions: [
      {
        id: 1,
        question: 'Quantas bolas há na imagem?',
        imageUrl: '/images/exercises/five-balls.png',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5'
      },
      {
        id: 2,
        question: 'Qual é o resultado de 2 + 3?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Quantos dedos você tem em uma mão?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
        imageUrl: null
      }
    ],
    difficulty: 'fácil'
  },
  {
    id: 4,
    title: 'Adição e Subtração Simples',
    grade: '1º ano',
    subject: 'Matemática',
    description: 'Resolva as operações de adição e subtração.',
    questions: [
      {
        id: 1,
        question: '3 + 2 = ?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
        imageUrl: null
      },
      {
        id: 2,
        question: '7 - 3 = ?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Se tenho 5 maçãs e como 2, quantas ficam?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        imageUrl: null
      }
    ],
    difficulty: 'fácil'
  },
  
  // Inglês - 1º ano
  {
    id: 5,
    title: 'Cores em Inglês',
    grade: '1º ano',
    subject: 'Inglês',
    description: 'Identifique as cores em inglês.',
    questions: [
      {
        id: 1,
        question: 'Qual é a cor "RED" em português?',
        options: ['Azul', 'Verde', 'Vermelho', 'Amarelo'],
        correctAnswer: 'Vermelho',
        imageUrl: null
      },
      {
        id: 2,
        question: 'Como se diz "AZUL" em inglês?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correctAnswer: 'Blue',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Qual é a cor "YELLOW" em português?',
        options: ['Verde', 'Vermelho', 'Roxo', 'Amarelo'],
        correctAnswer: 'Amarelo',
        imageUrl: null
      }
    ],
    difficulty: 'fácil'
  },
  
  // Estudo do Meio - 1º ano
  {
    id: 6,
    title: 'Animais e seus Habitats',
    grade: '1º ano',
    subject: 'Estudo do Meio',
    description: 'Relacione os animais com seus habitats.',
    questions: [
      {
        id: 1,
        question: 'Onde vive o peixe?',
        options: ['Floresta', 'Água', 'Deserto', 'Céu'],
        correctAnswer: 'Água',
        imageUrl: null
      },
      {
        id: 2,
        question: 'Qual animal voa pelo céu?',
        options: ['Cobra', 'Peixe', 'Pássaro', 'Gato'],
        correctAnswer: 'Pássaro',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Onde podemos encontrar uma formiga?',
        options: ['No céu', 'No mar', 'No solo', 'Nas árvores'],
        correctAnswer: 'No solo',
        imageUrl: null
      }
    ],
    difficulty: 'fácil'
  },
  
  // Português - 2º ano
  {
    id: 7,
    title: 'Separação de Sílabas',
    grade: '2º ano',
    subject: 'Português',
    description: 'Separe as palavras em sílabas.',
    questions: [
      {
        id: 1,
        question: 'Como separamos a palavra "CASA" em sílabas?',
        options: ['C-A-S-A', 'CA-SA', 'CAS-A', 'C-ASA'],
        correctAnswer: 'CA-SA',
        imageUrl: null
      },
      {
        id: 2,
        question: 'Quantas sílabas tem a palavra "BORBOLETA"?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Como separamos a palavra "ESCOLA" em sílabas?',
        options: ['E-SCOLA', 'ES-CO-LA', 'E-SCO-LA', 'ESC-O-LA'],
        correctAnswer: 'ES-CO-LA',
        imageUrl: null
      }
    ],
    difficulty: 'médio'
  },
  
  // Matemática - 2º ano
  {
    id: 8,
    title: 'Multiplicação Básica',
    grade: '2º ano',
    subject: 'Matemática',
    description: 'Resolva as operações de multiplicação.',
    questions: [
      {
        id: 1,
        question: '2 × 3 = ?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '6',
        imageUrl: null
      },
      {
        id: 2,
        question: '4 × 2 = ?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Se tenho 3 pacotes com 4 bolachas cada, quantas bolachas tenho ao todo?',
        options: ['7', '10', '12', '15'],
        correctAnswer: '12',
        imageUrl: null
      }
    ],
    difficulty: 'médio'
  },
  
  // Inglês - 2º ano
  {
    id: 9,
    title: 'Animais em Inglês',
    grade: '2º ano',
    subject: 'Inglês',
    description: 'Identifique os nomes dos animais em inglês.',
    questions: [
      {
        id: 1,
        question: 'Como se diz "GATO" em inglês?',
        options: ['Dog', 'Cat', 'Bird', 'Fish'],
        correctAnswer: 'Cat',
        imageUrl: null
      },
      {
        id: 2,
        question: 'Qual animal é o "DOG"?',
        options: ['Gato', 'Pássaro', 'Cachorro', 'Peixe'],
        correctAnswer: 'Cachorro',
        imageUrl: null
      },
      {
        id: 3,
        question: 'Como se diz "PEIXE" em inglês?',
        options: ['Bird', 'Cat', 'Dog', 'Fish'],
        correctAnswer: 'Fish',
        imageUrl: null
      }
    ],
    difficulty: 'médio'
  },
  
  // Estudo do Meio - 2º ano
  {
    id: 10,
    title: 'Ciclo da Água',
    grade: '2º ano',
    subject: 'Estudo do Meio',
    description: 'Entenda o ciclo da água na natureza.',
    questions: [
      {
        id: 1,
        question: 'O que acontece com a água dos rios e mares quando o sol a aquece?',
        options: ['Congela', 'Evapora', 'Desaparece', 'Fica mais salgada'],
        correctAnswer: 'Evapora',
        imageUrl: null
      },
      {
        id: 2,
        question: 'Como chamamos o processo em que a água cai das nuvens?',
        options: ['Evaporação', 'Condensação', 'Precipitação', 'Filtração'],
        correctAnswer: 'Precipitação',
        imageUrl: null
      },
      {
        id: 3,
        question: 'O que são as nuvens?',
        options: ['Fumaça', 'Água líquida', 'Poeira', 'Água em forma de gotículas'],
        correctAnswer: 'Água em forma de gotículas',
        imageUrl: null
      }
    ],
    difficulty: 'médio'
  }
];
