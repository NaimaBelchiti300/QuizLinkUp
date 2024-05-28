import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../css/student.css'
import { NavLink } from 'react-router-dom';
export default function Result() {



    return (
        < div className='resultsection'>
        <Confetti />
            <div className='felicitation'>
                <h1>                Félicitations ! Vous avez obtenu un score de 100 sur 100.
</h1>

            </div>
            <NavLink to='/student'><button className='finish-quizresult'>Back</button></NavLink>

        </div>
    );
}
