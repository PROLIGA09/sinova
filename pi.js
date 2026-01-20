import { useEffect, useState } from 'react';

export default function Home() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('/api/messages')
            .then(res => res.json())
            .then(data => setMessages(data));
    }, []);

    return ( <
        div >
        <
        h1 > Telegram Xabarlar < /h1> <
        ul > {
            messages.map(msg => ( <
                li key = { msg._id } >
                <
                strong > { msg.username }: < /strong> {msg.text} <
                /li>
            ))
        } <
        /ul> <
        /div>
    );
}