import { Button } from "./component-library/Button/Button";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Button</Button>
      </header>
      <main>
        <h1>Hi</h1>
        <Button
          onClick={() => console.log("hello world")}
          variant="primary"
          color="green.5"
        >
          Button green.5
        </Button>
      </main>
    </div>
  );
}
