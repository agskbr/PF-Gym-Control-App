import ChatBot from 'react-simple-chatbot';
import style from './chatBot.module.css';
import  { ThemeProvider } from 'styled-components';


export default function PowerChat (){

    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#EF6C00',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#EF6C00',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
        height: '200px',
      };
      

return (
           
                <ThemeProvider theme={theme}>
                    <ChatBot
                        steps={[
                        {
                            id: '1',
                            message: 'Que onda, en que te puedo ayudar?',
                            trigger: '2',
                        },
                        {
                            id: '2',
                            options: [
                            { value: 1, label: 'Ofertas del dia', trigger: '4' },
                            { value: 2, label: 'Pasame el whatsapp de una persona real', trigger: '5' },
                            { value: 3, label: 'Tenes algun regalo para mi?', trigger: '3' },
                            ],
                        },
                        {
                            id: '3',
                            message: 'Disculpa mostro, no te puedo ayudar en eso',
                            trigger: '2',
                        },
                        {
                            id: '4',
                            message: 'Proximamente (:',
                            trigger: '2',
                        },
                        {
                            id: '5',
                            message: 'Me ofendes, pero anota crack: +5411257896',
                            trigger: '2',
                        },
                        ]}
                    />
                </ThemeProvider>
            
        )
}
