
function CircleSvg({radius,height,width,cx,cy,fill,className=""}:any) {
  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" className={className}>
  <circle r={radius} cx={cx} cy={cy} fill={fill} />
</svg>


    
    
  )
}

export default CircleSvg
