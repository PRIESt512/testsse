import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SSEProvider, useSSE} from 'react-hooks-sse';
import {CookiesProvider} from 'react-cookie';
import { useCookies } from 'react-cookie';

const axios = require('axios').default;
const setCookie = require('set-cookie-parser');

/*
С сервера приходит следующая информация:

id:1
event:clientSSE
data:{"currentTime": "05:17:14.588857"}

 */

var count = 0

//все по феншую, соединение само отвалится от бэка, если компонент размонтируется. И на бэк меньше нагрузки ненужной, и как доктор по performance браузера прописал)))
const SSE = () => {
    const state = useSSE('consultantSSE', {
        newId: null
    }); //первоначальный стейт должен по своей структуре соответствовать (желательно) структуре объекта, который приходит от сервера
    // все, что приходит в data поле, это и есть полезная нагрузка. Сырые данные по умолчанию парсятся JSON.parse (см. исходники react-hooks-sse)
    // Парисинг можно модифицировать под свои нужды (см. https://www.npmjs.com/package/react-hooks-sse)
    //технически, сможем сделать на каждый случай отдельный event и использовать для своих технических нужд.
    //P.S. в случае "единого разрыва" соединения, EventSource сам восстановит коннект

    //P.P.S. - в консоли разраба (ВЕБ) удобно следить за живыми данными, которые идут на фронт. ПЛюс, также если выбрать соединение, откроется отдельное окно браузера, там получите хистори ответов бэка

    const [cookies, setCookie] = useCookies(['JSESSIONID']);

    //if (count === 0) {
        axios({
            method: 'get',
            url: '',
            withCredentials: false,
            headers: {'Authorization': 'Basic OTEwODI5NjExNjoxMTEx'},
            // data: {
            //     clientId: 6,
            //     consultantId: 1
            // },
        })
            .then(function (response) {
                // let cookies = setCookie.parse(response, {
                //     decodeValues: true  // default: true
                // });
                console.log(cookies)
                // cookies.forEach(console.log);
            }).catch(function (error) {
            console.log(error)
        })
        count++;
   // }


    // axios.post('', {
    //     "clientId": 2,
    //     "consultantId": 1
    // }).then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    console.log(state)
    if (state.newId == null) {
        return "Empty"
    } else {
        return "Получили данные- " + state.newId
    }
}

const App = () => (
    <CookiesProvider>
        <SSEProvider endpoint="">
            <h1>Subscribe & update to SSE event</h1>
            <SSE/>
        </SSEProvider>
    </CookiesProvider>
)

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
