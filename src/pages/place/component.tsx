import React, { useState } from 'react'
import CastomChart from '../../components/chart/component';
import PlaceContetext from '../../contexts/place';

export const Place: React.FC = () => {
    const [placeCont, setPlaceCont] = useState({
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '# Загрязнения pm10',
                data: [],
                borderWidth: 1,
                backgroundColor: 'rgba(23, 162, 184, 1)',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })

    const [city, setCity] = useState()
    const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
    const createNode = (element: any) => {
        return document.createElement(element)
    }
    const append = (parent: any, el: any) => {
        return parent.appendChild(el)
    }
    const average = (nums: any) => {
        return nums.reduce((a: any, b: any) => (a + b)) / nums.length;
    }

    const handlChangeCity = (event: any) => {
        setCity(event.target.value)
    }

    const handlClickGetPoluted = (event: any) => {
        document.getElementById('table-poluted')?.remove()
        fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${city}&format=json`).then(
            (resp) => resp.json()).then(
                function (data) {
                    let position = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                    let coordinates = []
                    if (position) {
                        coordinates = position.split(' ')
                        if (coordinates) {
                            const apiOpenMeteo = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`
                            return fetch(apiOpenMeteo).then(
                                (resp) => resp.json()).then(
                                    function (data) {
                                        // В переменной храняться дни для построения диаграммы
                                        let timeScale: any = []
                                        let polutionInfo = data.hourly;
                                        let table = createNode('table')
                                        let trPM2_5 = createNode('tr')
                                        let tdPM2_5 = createNode('td')
                                        tdPM2_5.innerHTML = 'pm2_5';
                                        let trPM10 = createNode('tr')
                                        let tdPM10 = createNode('td')
                                        tdPM10.innerHTML = 'pm10';
                                        let trTime = createNode('tr')
                                        let tdTime = createNode('td')
                                        tdTime.innerHTML = 'Время';
                                        table.style.border = tdPM2_5.style.border = tdPM10.style.border = tdTime.style.border = '1px solid black'
                                        table.classList.add('table', 'table-dark', 'table-responsive')
                                        table.id = 'table-poluted'
                                        append(table, trTime);
                                        append(table, trPM2_5);
                                        append(table, trPM10);
                                        append(trPM2_5, tdPM2_5);
                                        append(trPM10, tdPM10);
                                        append(trTime, tdTime);

                                        polutionInfo.pm2_5.map(function (info: any) {
                                            let td = createNode('td');
                                            td.style.border = '1px solid black'
                                            td.innerHTML = info;
                                            append(trPM2_5, td);
                                        })
                                        polutionInfo.pm10.map(function (info: any, index: any) {
                                            const avaragePm10 = []
                                            let arrayIndex = index
                                            let dateTimePm10 = polutionInfo.time[arrayIndex]
                                            let datePm10 = new Date(dateTimePm10)
                                            let dayOfMonthPm10 = datePm10.getDate()
                                            if (!polutionInfo.byDayPm10) {
                                                polutionInfo.byDayPm10 = []
                                            }
                                            if (!polutionInfo.byDayPm10[dayOfMonthPm10]) {
                                                polutionInfo.byDayPm10[dayOfMonthPm10] = []
                                            }
                                            polutionInfo.byDayPm10[dayOfMonthPm10].push(info)
                                            let td = createNode('td');
                                            td.innerHTML = info;
                                            td.style.border = '1px solid black'
                                            append(trPM10, td);
                                        })
                                        // Получаем средние значения по дням
                                        polutionInfo.byDayPm10.map(function (data: any, index: any) {
                                            if (!polutionInfo.avaragePm10) {
                                                polutionInfo.avaragePm10 = []
                                            }
                                            polutionInfo.avaragePm10.push(average(data))
                                        })
                                        polutionInfo.time.map(function (info: any) {
                                            let date = new Date(info)
                                            let dateTime = info.split('T')
                                            let dayOfMonth = date.getDate()
                                            let month = date.getMonth() + 1
                                            let day = dayOfMonth + '.' + month
                                            let td = createNode('td');
                                            let convertedDateTime = dateTime[0] + ' ' + dateTime[1]
                                            td.style.border = '1px solid black'
                                            td.style.minWidth = '80px'
                                            td.innerHTML = convertedDateTime
                                            // Для построения временной шкалы
                                            if (!timeScale.includes(day)) {
                                                timeScale.push(day)
                                            }
                                            append(trTime, td);
                                        })
                                        let div = document.getElementById('air-pollution')
                                        append(div, table)

                                        const ctx = document.getElementById('myChart')

                                        const chartInfo = {
                                            type: 'bar',
                                            data: {
                                                labels: timeScale,
                                                datasets: [{
                                                    label: '# Загрязнения pm10',
                                                    data: polutionInfo.avaragePm10,
                                                    borderWidth: 1,
                                                    backgroundColor: 'rgba(23, 162, 184, 1)',
                                                }]
                                            },
                                            options: {
                                                scales: {
                                                    y: {
                                                        beginAtZero: true
                                                    }
                                                }
                                            }
                                        }
                                        setPlaceCont(chartInfo)
                                    })
                                .catch(function (error) {
                                    console.log(error);
                                })
                        }
                    }
                })
            .catch(function (error) {
                console.log(error);
            })
    }

    const enterPressed = (event: any) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            handlClickGetPoluted(event)
        }
    }

    return (
        <>
            <div className="container-fluid bg-primary px-0 px-md-5 mb-5">
                <div className="row align-items-center px-3 py-5">
                    <div className="col-lg-12 text-center text-lg-left">
                        <h1 className="display-3 font-weight-bold text-white text-center">
                            Информация по загрязнению
                        </h1>
                    </div>
                </div>
            </div>
            <div className="row vh-50 justify-content-center">

                <div className="col-lg-3 ml-5 mb-5 mt-1">
                    <div className="contact-form">
                        <div className="control-group">
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                onChange={handlChangeCity}
                                placeholder='Введите название города'
                                onKeyUp={enterPressed}
                            />
                            <p className="help-block text-danger"></p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 mb-4">
                    <button
                        className="btn btn-primary py-2 px-4"
                        type="submit"
                        onClick={handlClickGetPoluted}
                        id="sendMessageButton"
                    >
                        Показать
                    </button>
                </div>
            </div>

            <div className="row container-fluid">
                <div className="col-lg-12 mb-4" id="air-pollution"></div>
            </div>
            <div className="row container-fluid ml-3">
                <PlaceContetext.Provider value={placeCont}>
                    <CastomChart />
                </PlaceContetext.Provider>
            </div>
        </>
    )
}