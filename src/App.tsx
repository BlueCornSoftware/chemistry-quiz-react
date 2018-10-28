import * as React from 'react';
import './App.css';

/* tslint:disable jsx-no-lambda */
/* tslint:disable object-literal-sort-keys */
/* tslint:disable max-classes-per-file */

interface IHeaderProps {
  score: number;
  skippedQuestions: number;
}

class Header extends React.Component<IHeaderProps> {
  public render() {
    const { score, skippedQuestions } = this.props;
    return (
      <div>
        <span>Score {score}</span>
        <span>Skipped Questions {skippedQuestions}</span>
      </div>
    );
  }
}

interface IQuestionTextProps {
  atomicSymbol: string;
}

class QuestionText extends React.Component<IQuestionTextProps> {
  public render() {
    const { atomicSymbol } = this.props;
    return <div>What element has the atomic symbol {atomicSymbol}?</div>;
  }
}

type AtomicElement = any;

interface IGuessHookState {
  guess: AtomicElement;
  isCorrect: boolean;
}

interface IChoicesProps {
  data: AtomicElement[];
  correctAnswer: AtomicElement;
  afterGuess: (h: IGuessHookState) => void;
}

interface IChoicesState {
  elements: AtomicElement[];
}

class Choices extends React.Component<IChoicesProps, IChoicesState> {
  constructor(props: IChoicesProps) {
    super(props);
    this.state = {
      elements: props.data,
    };
  }

  public render() {
    const { elements } = this.state;
    return (
      <div>
        {elements.map((element: any) => {
          return (
            <>
              <button
                key={element.number}
                onClick={() => this.handleGuess(element)}
              >
                {element.name}
              </button>
              <br />
            </>
          );
        })}
      </div>
    );
  }

  private handleGuess(element: AtomicElement): void {
    const { correctAnswer } = this.props;
    if (element.name === correctAnswer.name) {
      this.handleCorrectGuess(element);
    } else {
      this.handleIncorrectGuess(element);
    }
  }

  private handleCorrectGuess(element: AtomicElement) {
    const { afterGuess } = this.props;
    afterGuess({ isCorrect: true, guess: element });
  }

  private handleIncorrectGuess(element: AtomicElement) {
    this.setState({
      elements: this.state.elements.filter(
        (el: any) => el.name !== element.name
      ),
    });
    this.props.afterGuess({ guess: element, isCorrect: false });
  }
}

class SkipButton extends React.Component {
  public render() {
    return <button>Skip</button>;
  }
}

// click wrong answer and have option disappear
// and, score drop by 10

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  public render() {
    const [correctAnswer] = sampleData;
    const { score } = this.state;
    return (
      <div className="app">
        <Header score={score} skippedQuestions={0} />
        <QuestionText atomicSymbol={correctAnswer.symbol} />
        <Choices
          data={sampleData}
          correctAnswer={correctAnswer}
          afterGuess={h => {
            if (!h.isCorrect) {
              this.setState({
                score: this.state.score - 10,
              });
            } else {
              this.setState({
                score: this.state.score + 10,
              });
            }
          }}
        />
        <SkipButton />
      </div>
    );
  }
}

/* tslint:enable max-classes-per-file */

const sampleData = [
  {
    name: 'Hydrogen',
    appearance: 'colorless gas',
    atomic_mass: 1.008,
    boil: 20.271,
    category: 'diatomic nonmetal',
    color: null,
    density: 0.08988,
    discovered_by: 'Henry Cavendish',
    melt: 13.99,
    molar_heat: 28.836,
    named_by: 'Antoine Lavoisier',
    number: 1,
    period: 1,
    phase: 'Gas',
    source: 'https://en.wikipedia.org/wiki/Hydrogen',
    spectral_img: 'https://en.wikipedia.org/wiki/File:Hydrogen_Spectra.jpg',
    summary:
      'Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the Universe, constituting roughly 75% of all baryonic mass.',
    symbol: 'H',
    xpos: 1,
    ypos: 1,
    shells: [1],
  },
  {
    name: 'Helium',
    appearance:
      'colorless gas, exhibiting a red-orange glow when placed in a high-voltage electric field',
    atomic_mass: 4.0026022,
    boil: 4.222,
    category: 'noble gas',
    color: null,
    density: 0.1786,
    discovered_by: 'Pierre Janssen',
    melt: 0.95,
    molar_heat: null,
    named_by: null,
    number: 2,
    period: 1,
    phase: 'Gas',
    source: 'https://en.wikipedia.org/wiki/Helium',
    spectral_img: 'https://en.wikipedia.org/wiki/File:Helium_spectrum.jpg',
    summary:
      'Helium is a chemical element with symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas that heads the noble gas group in the periodic table. Its boiling and melting points are the lowest among all the elements.',
    symbol: 'He',
    xpos: 18,
    ypos: 1,
    shells: [2],
  },
  {
    name: 'Lithium',
    appearance: 'silvery-white',
    atomic_mass: 6.94,
    boil: 1603,
    category: 'alkali metal',
    color: null,
    density: 0.534,
    discovered_by: 'Johan August Arfwedson',
    melt: 453.65,
    molar_heat: 24.86,
    named_by: null,
    number: 3,
    period: 2,
    phase: 'Solid',
    source: 'https://en.wikipedia.org/wiki/Lithium',
    spectral_img: null,
    summary:
      'Lithium (from Greek:\u03bb\u03af\u03b8\u03bf\u03c2 lithos, "stone") is a chemical element with the symbol Li and atomic number 3. It is a soft, silver-white metal belonging to the alkali metal group of chemical elements. Under standard conditions it is the lightest metal and the least dense solid element.',
    symbol: 'Li',
    xpos: 1,
    ypos: 2,
    shells: [2, 1],
  },
  {
    name: 'Beryllium',
    appearance: 'white-gray metallic',
    atomic_mass: 9.01218315,
    boil: 2742,
    category: 'alkaline earth metal',
    color: null,
    density: 1.85,
    discovered_by: 'Louis Nicolas Vauquelin',
    melt: 1560,
    molar_heat: 16.443,
    named_by: null,
    number: 4,
    period: 2,
    phase: 'Solid',
    source: 'https://en.wikipedia.org/wiki/Beryllium',
    spectral_img: null,
    summary:
      'Beryllium is a chemical element with symbol Be and atomic number 4. It is created through stellar nucleosynthesis and is a relatively rare element in the universe. It is a divalent element which occurs naturally only in combination with other elements in minerals.',
    symbol: 'Be',
    xpos: 2,
    ypos: 2,
    shells: [2, 2],
  },
];

export default App;
