import { Rnd } from 'react-rnd'

function limitDrag(deltaX, deltaY, rect, maxWidth, maxHeight, rectId) {
    let { width, height } = rect

    if (width + deltaX > maxWidth)
        deltaX = maxWidth - width
    if (height + deltaY > maxHeight)
        deltaY = maxHeight - height
    return {
        id: rectId,
        x: Math.round(deltaX < 0 ? width / 2 : deltaX + width / 2),
        y: Math.round(deltaY < 0 ? height / 2 : deltaY + height / 2),
        width: Math.round(width),
        height: Math.round(height),
    }
}

function limitResize(x, y, rect, width, height, maxWidth, maxHeight, rectId) {
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
        id: rectId,
        x: Math.round(x + width / 2),
        y: Math.round(y + height / 2),
        width: Math.round(width),
        height:Math.round(height),
    }
}

const style = {
    border: "2px solid red",
};

const RectDraw = props => {
    
    const { rect, setRect, maxWidth, maxHeight, updateRectInfo, addRectInfo, setSelect } = props

    const handleResize = (e, direction, ref, delta, position, idx, rectId) => {
        let { width, height } = ref.style
        let { x, y } = position

        width = parseInt(width)
        height = parseInt(height)
        x = Math.round(x)
        y = Math.round(y)
        let temp = [...rect]

        temp[idx] = limitResize(x, y, temp[idx], width, height, maxWidth, maxHeight, rectId)
        setRect(temp)
        updateRectInfo(temp)
        addRectInfo(temp[idx])
        setSelect(rectId)
    }

    const handleDrag = (d, idx, rectId) => {
        let temp = [...rect]
        temp[idx] = limitDrag(d.x, d.y, rect[idx], maxWidth, maxHeight, rectId)
        setRect(temp)
        updateRectInfo(temp)
        addRectInfo(temp[idx])
        setSelect(rectId)
    }

    return (rect.map((r, i) => {
        return <Rnd
            style={style}
            size={{ width: r.width, height: r.height }}
            position={{ x: (r.x - r.width / 2), y: (r.y - r.height / 2)}}
            onDrag={(e, d) => handleDrag(d, i, r.id)}
            onResize={(e, direction, ref, delta, position) => handleResize(e, direction, ref, delta, position, i, r.id)}
        >
        </Rnd>
    }))
}


export { RectDraw }