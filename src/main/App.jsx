import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/main';


function Contents() {
    return(
        <>
          <Header />
            <Main/>
          <Footer />
        </>
    );
}

function App() {
    return <Contents />;
}

export default App;
