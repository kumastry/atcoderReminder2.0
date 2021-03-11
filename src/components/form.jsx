import {useEffect, useState} from 'react';
import {fetchPromDiff, fetchPromInfo, fetchUesrsSub} from '../main/api';
import { db } from '../firebase';
import ProblemSet from './problemset';

function Form(props) {
    const [problemUrl, setProblemUrl] = useState('');
    const [problems, setProblems] = useState(['init']);
    const [subFilter, setSubFilter] = useState('all');
    const [diffFilter, setDiffFilter] = useState('all');


    let userName_tmp = props.userName;
    useEffect (() => {
        console.log('44444');
        const dataref = db.collection('problems').doc(props.uid);
        dataref.get().then((doc) => {
            console.log('555555')
            console.log(doc.data());
            if(doc.exists) {
                const dbData = doc.data();
                console.log('666666');
                console.log(dbData.problems);
                if(dbData.problems===undefined) {
                    db.collection("problems").doc(props.uid).set({})
                    console.log('###');
                } else  {
                    console.log(dbData.problems);
                    setProblems(dbData.problems);
                }
            } else {
                console.log("no data");
            }
        });
    },[])

    useEffect (() => {

        if(problems[0] !== 'init') {
            db.collection("problems").doc(props.uid).set({problems})
            .then(() => {
                console.log(problems);
                console.log("Document written ");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    },[problems])

    function handleChange(event) {
        setProblemUrl(event.target.value);
    }

    function addProblem(event) {
        let tmp = problems.slice(0, problems.length);
        const urlsplit = problemUrl.split('/');
        const problem_Id_tmp = urlsplit[urlsplit.length-1];
        const contest_tmp = urlsplit[urlsplit.length-3];
        let Name_tmp = '';
        let diff_tmp = 0;
        let sub_tmp = 'nosub';

        fetchPromInfo().then((url1s) => {

            url1s.map((url1s) => {
                if(url1s.id === problem_Id_tmp) {
                    Name_tmp = url1s.title;
                }
            });

        }).then(() => {

            if(Name_tmp !== '') {
                fetchPromDiff().then((url2) => {
                    diff_tmp = typeof(url2[problem_Id_tmp]) === 'undefined'?0:url2[problem_Id_tmp]['difficulty'];
                } ).then(() => {
                    fetchUesrsSub(userName_tmp).then((url3) => {
                        url3.map((url3) => {
                          
                            if(url3.problem_id === problem_Id_tmp) {
                                if(sub_tmp === 'nosub') {
                                    sub_tmp = url3.result;
                                } else if(sub_tmp !== 'AC' && url3.result === 'AC') {
                                    sub_tmp = url3.result;
                                } else if(sub_tmp !== 'AC') {
                                    if(sub_tmp !== 'WA' && url3.result === 'WA') {
                                        sub_tmp = url3.result;
                                    } else if(sub_tmp !== 'TLE' && url3.result === 'TLE') {
                                        sub_tmp = url3.result;
                                    } else {
                                        sub_tmp = url3.result;
                                    }
                                }
                            }
                        });

                    }).then(() => {

                        let userName_tmp = props.userName ===''?'no user':props.userName;
                        const problem_Obj = {
                            title:Name_tmp,
                            url:problemUrl,
                            diff:Math.max(diff_tmp, 0),
                            problem_id:problem_Id_tmp,
                            contest:contest_tmp,
                            sub:sub_tmp,
                            user:userName_tmp
                        };

                        tmp.unshift(problem_Obj);
                        setProblems(tmp);
                        
                    });
                });
            } else {
                alert("Problem Not Found");
            }
        });

        setProblemUrl('');
    }

    function handlePress(event) {
        if(event.key === 'Enter') {
            addProblem();
        }
    }
    
    function deleteTask(key) {
        let tmp = problems.slice(0, problems.length);
        tmp.splice(key, 1);
        setProblems(tmp);
    }


    return(
        <div>
            <main>

                  <button class="button">
    <span class="icon is-small">
      <i class="fas fa-underline"></i>
    </span>
  </button>

            <section className="section">
                <input className="input" type="text" placeholder="Problem URL" value = {problemUrl} onChange={handleChange} onKeyPress={handlePress} />
                <button className="button is-fullwidth is-success is-light" onClick={addProblem}>Add Problem</button>

           
                <div className="select is-success is-active ">
                    <select  onChange={(e) => setSubFilter(e.target.value)}>
                        <option value='all' >submission-All</option>
                        <option value='AC'>AC</option>
                        <option value='WA'>WA</option>
                        <option value='nosub'>Nosub</option>
                    </select>
                </div>

          
                <div className="select is-success is-active">
                    <select onChange={(e) => setDiffFilter(e.target.value)}>
                        <option value='all'>diffculity-All</option>
                        <option value='gray'>-400</option>
                        <option value='brawn'>400-800</option>
                        <option value='green'>800-1200</option>
                        <option value='cyan'>1200-1600</option>
                        <option value='blue'>1600-2000</option>
                        <option value='yellow'>2000-2400</option>
                        <option value='orange'>2400-2800</option>
                        <option value='red' style={{width:"80px", height:"80px", borderRadius: "50%",  background: "skyblue"}}>2800-</option>
                    </select>
                </div>

              
               
                <section className="section">
                    <ProblemSet array={problems} deleteTask={deleteTask} diffFilter = {diffFilter} subFilter={subFilter}/>
                </section>
            </section>
            </main>
        </div>
    );
}

export default Form;