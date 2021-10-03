import { Rnd } from 'react-rnd'

function limitDrag(deltaX, deltaY, rect, maxWidth, maxHeight) {
    let { width, height } = rect

    if (width + deltaX > maxWidth)
        deltaX = maxWidth - width
    if (height + deltaY > maxHeight)
        deltaY = maxHeight - height
    return {
        x: Math.round(deltaX < 0 ? width / 2 : deltaX + width / 2),
        y: Math.round(deltaY < 0 ? height / 2 : deltaY + height / 2),
        width: Math.round(width),
        height: Math.round(height),
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
        x: Math.round(x + width / 2),
        y: Math.round(y + height / 2),
        width: Math.round(width),
        height:Math.round(height),
    }
}

const style = {
    border: "2px solid red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.2rem",
    color: 'rgba(230, 18, 18, 0.2)'
};

const RectDraw = props => {
    
    const { rect, setRect, maxWidth, maxHeight } = props
    console.log(rect)

    const handleResize = (e, direction, ref, delta, position, idx) => {
        let { width, height } = ref.style
        let { x, y } = position

        width = parseInt(width)
        height = parseInt(height)
        x = Math.round(x)
        y = Math.round(y)
        let temp = [...rect]

        temp[idx] = limitResize(x, y, temp[idx], width, height, maxWidth, maxHeight)
        setRect(temp)
    }

    const handleDrag = (d, idx) => {
        console.log(d, rect[idx])
        let temp = [...rect]
        temp[idx] = limitDrag(d.x, d.y, rect[idx], maxWidth, maxHeight)
        setRect(temp)
    }

    return (rect.map((r, i) => {
        return <Rnd
            style={style}
            size={{ width: r.width, height: r.height }}
            position={{ x: (r.x - r.width / 2), y: (r.y - r.height / 2)}}
            onDragStop={(e, d) => handleDrag(d, i)}
            onResizeStop={(e, direction, ref, delta, position) => handleResize(e, direction, ref, delta, position, i)}
        >
            {i + 1}
        </Rnd>
    }))
}


export { RectDraw }