import {useEffect, useState} from 'react';
import SignIn from '../components/signin';
import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/main';
import {auth} from '../firebase';



function Contents(props) {
    return(
        <>
        <Header />
        <Main uid={props.uid}/>
        <Footer />
        </>
    );
}

function App() {
    const [loading, setloading] = useState(true);
    const [usercur, setusercur] = useState(null);

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
            setloading(false);
            setusercur(user);
            console.log(user.uid);
        });
        return () => unregisterAuthObserver();
    }, []);

    if(loading) return <div>loading...</div>

    if(usercur==null){
        return <SignIn/>;
    } else {
        return<Contents uid = {usercur.uid}/>;
    }
}

export default App;