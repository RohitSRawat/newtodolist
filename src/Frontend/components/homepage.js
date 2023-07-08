import React, { useState, useEffect,useRef,useId  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkverify,createtask,fetchtask,logout, updatetask ,deletetask} from "../actions";
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import $ from 'jquery'
const Homepage = (props) => {
  const counter = useSelector((state) => state.verify);
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef()

  useEffect(() => {
setTimeout(() => {
  dispatch(checkverify(navigate));
  dispatch(fetchtask());

},2000)
   
  }, []);

  const inputonchange = (e) => {
console.log(e)


  }
  const tasklist = () => {

    var wrap =  tasks.map((x,i,arr) => {

      return(
        <div className="tasklist" key={i}>
          <h2>{x.task}</h2>
          <input style={{display:'none'}} defaultValue={x.task} onChange={(e) => {
          }}/>
           <button onClick={(e) => {
            var eve= e.target

            if( $(e.target).text() == 'update'){
              console.log(eve.parentElement.children[1],x._id)
              var valinput = $(eve.parentElement.children[1]).val()
              if(valinput.trim() == ''){
                alert('cannot leave blank')
              }else{
                dispatch(updatetask({task:valinput,id:x._id}))
                $(eve.parentElement.children[0]).show()
  
                $(eve.parentElement.children[1]).hide()
                $(e.target).text('edit')
              }
             

            }else{
              $(eve.parentElement.children[0]).hide()

              $(eve.parentElement.children[1]).show()
              $(e.target).text('update')
            }
           
           }}>edit</button>

           <button onClick={() => {
              dispatch(deletetask(x._id));

           }}>Delete</button>
           
        </div>
      )
    })
      return(
        <div>
           
        <div>
          <h1>welcome {counter.name}</h1>
          <img src={counter.picture} />
          <button onClick={() => {
              dispatch(logout(navigate));
  
          }}>SignOut</button>
          <div>
            <input ref={inputRef} type="text"/>
            <button onClick={() => {
              var val = inputRef.current.value.trim()
              if (val.length == 0) {
                alert('please enter')
              }else{
                dispatch(createtask({task:inputRef.current.value}))
  
              }
            }}>Add</button>
          </div>
          <div>{wrap}</div>
        </div>
      
    </div>
      )
    
    
  }

  const render = () => {
    if (counter instanceof Object && counter.length !=0) {
      return (
       
<React.Fragment>
{tasklist()}

</React.Fragment>          
      );
    } else {
       return (
        <div>
         
            <div>
              <h1>{counter.name || <Skeleton width={300} />}</h1>
             <Skeleton circle width={94} height={94}/>
             <Skeleton  style={{ marginTop: '10px' }}  width={600} height={500} />
            </div>
          
        </div>
      );
    }
  };

  return <div>{render()}</div>;
};
export default Homepage;
