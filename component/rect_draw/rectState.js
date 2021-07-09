import { Rnd } from 'react-rnd'

function limitDrag(deltaX, deltaY, rect, maxWidth, maxHeight) {
    let { width, height } = rect

    if (width + deltaX > maxWidth)
        deltaX = maxWidth - width
    if (height + deltaY > maxHeight)
        deltaY = maxHeight - height
    return {
        x: deltaX < 0 ? 0 : deltaX,
        y: deltaY < 0 ? 0 : deltaY,
        width,
        height,
    }
}

function limitResize(x, y, rect, width, height, maxWidth, maxHeight) {
    let px = rect.x
    let py = rect.y

    if (x < 0) {
        x = 0
        width += px
    }
    if (y < 0) {
        y = 0
        height += py
    }
    if (x + width > maxWidth)
        width = maxWidth - x
    if (y + height > maxHeight)
        height = maxHeight - y
    return {
        x,
        y,
        width,
        height
    }
}

const style = {
    border: "2px solid red",
};

const RectDraw = props => {

    const { rect, setRect, maxWidth, maxHeight } = props

    const handleResize = (e, direction, ref, delta, position, idx) => {
        let { width, height } = ref.style
        let { x, y } = position

        x = Math.round(x)
        y = Math.round(y)
        width = parseInt(width)
        height = parseInt(height)
        let temp = [...rect]

        temp[idx] = limitResize(x, y, temp[idx], width, height, maxWidth, maxHeight)
        setRect(temp)
    }

    const handleDrag = (d, idx) => {
        console.log(d, rect[idx])
        let temp = [...rect]
        temp[idx] = limitDrag(d.x, d.y, rect[idx], maxWidth, maxHeight)
        console.log(temp[idx])
        setRect(temp)
    }

    return (rect.map((r, i) => {
        return <Rnd
            style={style}
            size={{ width: r.width, height: r.height }}
            position={{ x: r.x, y: r.y }}
            onDragStop={(e, d) => handleDrag(d, i)}
            onResizeStop={(e, direction, ref, delta, position) => handleResize(e, direction, ref, delta, position, i)}
        >
        </Rnd>
    }))
}


export { RectDraw }