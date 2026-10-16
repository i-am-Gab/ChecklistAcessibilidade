import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react'
import styles from './Toast.module.css'

type DismissReason = 'timeout' | 'manual'

export interface ToastProps {
  id?: string
  message: string
  variant?: 'success' | 'error' | 'info'
  duration?: number
  onDismiss: (reason: DismissReason) => void
}

export function Toast({ id, message, variant = 'success', duration = 6000, onDismiss }: ToastProps) {
  const lifetime = Number.isFinite(duration) && duration > 0 ? duration : 6000
  const [remaining, setRemaining] = useState(lifetime)
  const remainingRef = useRef(lifetime)
  const startedAt = useRef<number | null>(null)
  const timeoutRef = useRef<number>()
  const intervalRef = useRef<number>()
  const pausedBy = useRef(new Set<'pointer' | 'focus'>())
  const dismissed = useRef(false)
  const onDismissRef = useRef(onDismiss)

  useEffect(() => {
    onDismissRef.current = onDismiss
  }, [onDismiss])

  const stopTimer = useCallback(() => {
    window.clearTimeout(timeoutRef.current)
    window.clearInterval(intervalRef.current)
    if (startedAt.current !== null) {
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt.current))
      startedAt.current = null
    }
  }, [])

  const dismiss = useCallback((reason: DismissReason) => {
    if (dismissed.current) return
    dismissed.current = true
    stopTimer()
    onDismissRef.current(reason)
  }, [stopTimer])

  const startTimer = useCallback(() => {
    if (dismissed.current || pausedBy.current.size > 0 || startedAt.current !== null) return
    startedAt.current = performance.now()
    timeoutRef.current = window.setTimeout(() => dismiss('timeout'), remainingRef.current)
    intervalRef.current = window.setInterval(() => {
      const elapsed = startedAt.current === null ? 0 : performance.now() - startedAt.current
      setRemaining(Math.max(0, remainingRef.current - elapsed))
    }, 100)
  }, [dismiss])

  useEffect(() => {
    dismissed.current = false
    remainingRef.current = lifetime
    setRemaining(lifetime)
    startTimer()
    return stopTimer
  }, [lifetime, startTimer, stopTimer])

  const pause = (reason: 'pointer' | 'focus') => {
    pausedBy.current.add(reason)
    stopTimer()
    setRemaining(remainingRef.current)
  }

  const resume = (reason: 'pointer' | 'focus') => {
    pausedBy.current.delete(reason)
    startTimer()
  }

  const StatusIcon = variant === 'error' ? CircleAlert : variant === 'info' ? Info : CheckCircle2

  return (
    <section
      className={`${styles.toast} ${styles[variant]}`}
      aria-label="Notificação"
      onPointerEnter={() => pause('pointer')}
      onPointerLeave={() => resume('pointer')}
      onFocusCapture={() => pause('focus')}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resume('focus')
      }}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          dismiss('manual')
        }
      }}
    >
      <div className={styles.content}>
        <StatusIcon className={styles.icon} size={24} aria-hidden="true" focusable="false" />
        <p id={id} className={styles.message}>{message}</p>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Fechar notificação"
          onClick={() => dismiss('manual')}
        >
          <X size={20} aria-hidden="true" focusable="false" />
        </button>
      </div>
      <div className={styles.timer} aria-hidden="true">
        <div className={styles.track}>
          <div className={styles.progress} style={{ width: `${Math.min(100, remaining / lifetime * 100)}%` }} />
        </div>
        <span className={styles.countdown}>{Math.ceil(remaining / 1000)} s</span>
      </div>
    </section>
  )
}
