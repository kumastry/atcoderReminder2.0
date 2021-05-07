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
       
        const dataref = db.collection('problems').doc(props.uid);
        dataref.get().then((doc) => {
        
            console.log(doc.data());
            if(doc.exists) {
                const dbData = doc.data();
           
                console.log(dbData.problems);
                if(dbData.problems===undefined) {
                    db.collection("problems").doc(props.uid).set({})
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
            console.log("fff")
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

    function addProblem() {
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
                            user:userName_tmp,
                            version:0
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

    
    function deleteTask(key) {
        let tmp = problems.slice(0, problems.length);
        tmp.splice(key, 1);
        setProblems(tmp);
    }

    const reLoad = () => {
        console.log(problems);
        let userNames = [];
        problems.map((t) => {
            userNames.push(t.user);
        });

        userNames = [...new Set(userNames)];
        let tmp = problems.slice(0, problems.length);;
        
        userNames.map((t1) => {
            fetchUesrsSub(t1).then((data) => {
            tmp.map((t2) => {
                    data.map((t3) => {
                        if(t2.problem_id === t3.problem_id) {
                            t2.sub = t3.result;
                            t2.version++;
                        }
                    })
                })
            })
        })

        setProblems(tmp);
        console.log(problems);
    }


    return(
        <div>
            <main>


            <section className="section">

                <button className="button" onClick={reLoad} style={{float:"left" }}>
                        <span class="icon">
                            <i class="fas fa-redo"></i>
                        </span>
                        <span>Reload</span>
                </button>


                <input className="input" 
                type="text" 
                placeholder="Problem URL" 
                value = {problemUrl} 
                onChange={(e) => setProblemUrl(e.target.value)} 
                onKeyPress={(e) => {e.key == 'Enter'?addProblem():""}} 
                />

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
                        <option value='gray'>0-400(gray)</option>
                        <option value='brawn'>400-800(brawn)</option>
                        <option value='green'>800-1200(green)</option>
                        <option value='cyan'>1200-1600(cyan)</option>
                        <option value='blue'>1600-2000(blue)</option>
                        <option value='yellow'>2000-2400(yellow)</option>
                        <option value='orange'>2400-2800(orange)</option>
                        <option value='red'>2800-∞(red)</option>
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