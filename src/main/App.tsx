import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";

function Contents(): React.JSX.Element {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

function App(): React.JSX.Element {
  return <Contents />;
}

export default App;
