import { useEffect, useState } from 'react';
import style from './Message.module.css'
function Message({ type, sms }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (sms === false) return;
        setVisible(true)
        const timer = setTimeout(()=>{
            setVisible(false)
            clearTimeout(timer)
        },3 * 1000)

    },[sms])

    return (
        <>
            {visible && <div className={`${style.sms} ${style[type]}`} >
                <span>{sms}</span>
            </div>}
        </>
    )
}

export default Message;