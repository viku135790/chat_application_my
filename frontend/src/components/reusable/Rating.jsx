

const Rating = ({ text, number }) => {
  return (
    <div className="flex text-2xl">
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent">{text} + </div>
      <div className="font-bold">{number}</div>
    </div>
  )
}

export default Rating