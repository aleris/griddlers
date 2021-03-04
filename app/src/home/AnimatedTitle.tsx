import './AnimatedTitle.scss'

type Props = {
  text: string
}

export const AnimatedTitle = ({text}: Props) => {
  return (
    <div className="AnimatedTitle">
      {
        text.split('').map((letter, index) =>
          <div key={index} style={{animationDelay: `${index * 70}ms`}}>{letter}</div>
        )
      }
    </div>
  )
}