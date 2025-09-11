import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Example from './Example';
import Home from './Home';

function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/example" element={<Example />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default Routers;

if (document.getElementById('root')) {
    ReactDOM.render(<Routers />, document.getElementById('root'));
}
