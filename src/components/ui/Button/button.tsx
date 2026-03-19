import styles from './button.module.css'

export type ButtonVariant = 'primary' | 'secondary'
export type IconPosition = 'left' | 'right'
export type IconAnimation = 'slideRight' | 'slideLeft' | 'bounce' | 'rotate' | 'none'

export interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
  variant?: ButtonVariant
  icon?: React.ReactNode
  iconPosition?: IconPosition
  customColor?: string
  iconAnimation?: IconAnimation
}

export function Button({
  text,
  onClick,
  disabled = false,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  customColor,
  iconAnimation = 'none'
}: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]}`
  const style = customColor ? { backgroundColor: customColor } : {}
  const iconClass = iconAnimation !== 'none' ? styles[`icon${iconAnimation.charAt(0).toUpperCase() + iconAnimation.slice(1)}`] : ''

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={style}
      aria-label={text}
    >
      {icon && iconPosition === 'left' && (
        <span className={`${styles.iconLeft} ${iconClass}`}>{icon}</span>
      )}
      {text}
      {icon && iconPosition === 'right' && (
        <span className={`${styles.iconRight} ${iconClass}`}>{icon}</span>
      )}
    </button>
  )
}