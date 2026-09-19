import { useEffect } from 'react'

// Lets a horizontally scrolling element be dragged with a mouse (touch already scrolls natively).
// A drag never triggers the click of the button under the cursor.
export default function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = null
    let moved = false

    const onMove = (e) => {
      if (!start) return
      const dx = e.clientX - start.x
      if (!moved && Math.abs(dx) < 6) return
      if (!moved) {
        moved = true
        el.classList.add('is-dragging')
      }
      el.scrollLeft = start.left - dx
    }
    const end = () => {
      start = null
      el.classList.remove('is-dragging')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
    }
    const onDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || el.scrollWidth <= el.clientWidth + 2) return
      start = { x: e.clientX, left: el.scrollLeft }
      moved = false
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', end)
      window.addEventListener('pointercancel', end)
    }
    const onClick = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    const noDrag = (e) => e.preventDefault() // stop the browser's native image ghost-drag

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('click', onClick, true)
    el.addEventListener('dragstart', noDrag)
    return () => {
      end()
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('click', onClick, true)
      el.removeEventListener('dragstart', noDrag)
    }
  }, [ref])
}
