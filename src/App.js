import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SSEProvider, useSSE} from 'react-hooks-sse';

/*
С сервера приходит следующая информация:

id:1
event:clientSSE
data:{"currentTime": "05:17:14.588857"}

 */

//все по феншую, соединение само отвалится от бэка, если компонент размонтируется. И на бэк меньше нагрузки ненужной, и как доктор по performance браузера прописал)))
const SSE = () => {
    const state = useSSE('clientSSE', {
        currentTime: null
    }); //первоначальный стейт должен по своей структуре соответствовать (желательно) структуре объекта, который приходит от сервера
    // все, что приходит в data поле, это и есть полезная нагрузка. Сырые данные по умолчанию парсятся JSON.parse (см. исходники react-hooks-sse)
    // Парисинг можно модифицировать под свои нужды (см. https://www.npmjs.com/package/react-hooks-sse)
    //технически, сможем сделать на каждый случай отдельный event и использовать для своих технических нужд.
    //P.S. в случае "единого разрыва" соединения, EventSource сам восстановит коннект

    //P.P.S. - в консоли разраба (ВЕБ) удобно следить за живыми данными, которые идут на фронт. ПЛюс, также если выбрать соединение, откроется отдельное окно браузера, там получите хистори ответов бэка

    //console.log(state)
    if (state.currentTime == null){
        return "Empty"
    } else {
        return "Текущее время на сервере - " + state.currentTime
    }
}

const App = () => (
    <SSEProvider endpoint="http://localhost:9991/sse">
        <h1>Subscribe & update to SSE event</h1>
        <SSE/>
    </SSEProvider>
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
