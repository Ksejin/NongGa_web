import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';


let data = {
    labels: ['0', '1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: 'data',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data:
                [100,
                    200,
                    300,
                    400,
                    500,
                    600,
                    700
                ]
        }
    ]
};

export default class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            loaded: false,
            models: ["gboost", "xgboost", "lasso", "lightgbm", "keras"],
            nongas: ["pepper", "onion", "garlic"],
            nos: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            nonga: '',
            model: '',
            no: '',
        };
    }

    async  componentDidMount() {
        fetch("https://nonga.s3.ap-northeast-2.amazonaws.com/predict.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    // console.log(Object.values(Object.values(result.pepper)[0]))
                    this.setState({
                        result,
                        loaded: true,
                    });
                },
                (error) => {

                }
            )


    }

    renderBar() {
        const { nonga, model, nongas, models, result, no, nos } = this.state;
        let ni = nongas.indexOf(nonga);
        let mi = models.indexOf(model);
        let noi = nos.indexOf(no);
        console.log(ni, mi, noi);
        let r = Object.values(result)[ni]
        r = Object.values(r)[mi]
        r = Object.values(r)[noi]
        console.log(r)
        data.datasets[0].data = r
        data.datasets[0].label = nonga + ' ' + model
        return <Bar
            data={data}
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
        />
    }

    renderPepper() {
        let pepper = Object.values(this.state.data.pepper);
        let p = Object.keys(this.state.data.pepper)
        // console.log(p)

        let pepperResult = []
        // console.log(pepper)
        // console.log(Object.keys(pepper[0]))
        let model = Object.values(pepper[0]);
        for (let i = 0; i < 6; i++) {
            let model2 = Object.values(model[i]);
            // console.log(model2)
            data.datasets[0].data = model2;
            pepperResult.push(
                <Bar
                    key={i}
                    data={data}
                    width={100}
                    height={50}
                    options={{ maintainAspectRatio: false }}
                />
            )
        }



        // let a = <Bar
        //     data={data}
        //     width={100}
        //     height={50}
        //     options={{ maintainAspectRatio: false }}
        // />
        // pepperResult.push(a)
        // pepperResult.push(a)
        // console.log(model)


        // console.log(data)
        data.datasets[0].label = 'pepper';
        return null
    }

    handleNonga(nonga) {
        this.setState({
            nonga
        })
    }

    handleModel(model) {
        this.setState({
            model
        })
    }


    handleNo(no) {
        this.setState({
            no
        })
    }



    render() {

        return (
            <>
                {
                    this.state.loaded ?
                        <div style={{ margin: 100 }}>
                            <div>
                                {
                                    this.state.nongas.map((item, id) =>
                                        <button key={id} onClick={() => this.handleNonga(item)}>
                                            {item}
                                        </button>
                                    )
                                }
                            </div>

                            <div style={{ marginTop: 10 }}>
                                {
                                    this.state.models.map((item, id) =>
                                        <button key={id} onClick={() => this.handleModel(item)}>
                                            {item}
                                        </button>
                                    )
                                }
                            </div>
                            <div style={{ marginTop: 10 }}>
                                {
                                    this.state.nos.map((item, id) =>
                                        <button key={id} onClick={() => this.handleNo(item)}>
                                            {item}
                                        </button>
                                    )
                                }
                            </div>
                            {this.state.nonga !== '' && this.state.model !== '' && this.state.no !== '' ? this.renderBar() : null}
                        </div> :
                        null
                }
            </>
        );
    }
}
