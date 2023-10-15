import React from 'react'
import { Link } from 'react-router-dom'
import picture from '../../assets/images/pumps.png';

export const About: React.FC = () => {
    return (
        <div className="container-fluid bg-primary px-0 px-md-5">
            <div className="row align-items-center px-3 min-vh-100">
                <div className="col-lg-6 text-center text-lg-left">
                    <h1 className="display-3 font-weight-bold text-white">
                        Сервис анализа загрязненности городов.
                    </h1>
                    <p className="text-white mb-4">
                        Сервис позволяет определить загрязненность города.<br />
                        Данные выводятся в виде графиков и таблиц.
                    </p>
                    <Link to="/place" className="btn btn-secondary mt-4 py-3 px-5">Попробовать</Link>
                </div>
                <div className="col-lg-6 text-center text-lg-right mb-5">
                    <img className="img-fluid" src={picture} alt="" />
                </div>
            </div>
        </div>
    )
}