
import './style.scss';
import {Row} from 'antd';


export function Dot({key,selected,setSelected}){
    
    
    if(selected==mykey){
        return (
            <div onClick={()=>{setSelected(mykey)}} className="dot selected"></div>
        )    
    }
    return (
        <div onClick={()=>{setSelected(mykey)}} className="dot"></div>
    )
}

export default function Dots({count,selected,setSelected}){
    const dots = [];
    for(let i=1;i<=count;i++){
        let s = "dot";
        if (selected==i){
            s += " selected"
        }
        dots.push(<div onClick={()=>{setSelected(i)}} className={s}></div>)
    }
    return(
        <Row type="flex" style={{flexDirection:"column"}} align="middle">
            {dots}
        </Row>
        
    )

}