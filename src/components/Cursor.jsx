import { useEffect } from 'react'

export default function Cursor() {
    useEffect(() => {
        const cursor = document.getElementById('cursor')
        const cursorDot = document.getElementById('cursor-dot')

        if (!cursor || !cursorDot) return

        const moveCursor = (e) => {
            cursor.style.left = e.clientX - 10 + 'px'
            cursor.style.top = e.clientY - 10 + 'px'
            cursorDot.style.left = e.clientX - 2 + 'px'
            cursorDot.style.top = e.clientY - 2 + 'px'
        }

        const handleMouseEnter = () => cursor.classList.add('hover')
        const handleMouseLeave = () => cursor.classList.remove('hover')

        document.addEventListener('mousemove', moveCursor)

        const hoverElements = document.querySelectorAll('[data-cursor="hover"]')
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)
        })

        return () => {
            document.removeEventListener('mousemove', moveCursor)
        }
    }, [])

    return (
        <>
            <div className="custom-cursor" id="cursor" />
            <div className="cursor-dot" id="cursor-dot" />
        </>
    )
}