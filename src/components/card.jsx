function Card(props) {
  
    let background = '';
    
    if(props.array.sub === 'AC') {
        background= "#c8e4cc";
    } else if (props.array.sub !== 'nosub'){
        background="#fcecbc";
    } else {
        background="#ffffff";
    }

    return(
        <div className="card" style={{ margin: "8px", backgroundColor:background,}}>
            <div className="card-content" >
                <p className="title">
                    <a href = {props.array.url} target="_black">

                        {props.array.contest + " " +props.array.title}<br/>
                        { "diff:" + props.array.diff + " submission:" + props.array.sub}<br/>
                    </a>
                </p>

                <p class="subtitle">
                    user:{props.array.user}
                </p>

                <footer className="card-footer">
                    {/* <input  type = "button" value = "edit" className="card-footer-item" onClick ={() => props.editTask(key)}/> */}  
                    <input  type = "button" value = "delete" className="card-footer-item" onClick={() => props.deleteTask(props.id)} />
                </footer>
            </div>
        </div>
    );
}

export default Card;