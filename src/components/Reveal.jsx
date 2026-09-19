import useInView from '../hooks/useInView'

// Scroll-reveal wrapper. `variant` picks the entrance: up (default), left, right, scale, mask.
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', variant = 'up', threshold, style, ...rest }) {
  const [ref, inView] = useInView(threshold === undefined ? undefined : { threshold })
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${inView ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={{ ...style, '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
