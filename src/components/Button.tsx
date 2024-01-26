'use client'
function Button(props) {
  return (
    <button className="mt-4 px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500"  onClick={()=>props.handleClick && props.handleClick() }  
    disabled={props.disabled || false}
    >{props.text}</button>
  )
}
export default Button
