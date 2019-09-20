import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            year:"",
            years: [],
            yearData: {
                circle1: "",
                circle2: "",
                categories: [],
            }
        };
    }

    setYear = (event) =>
    {
        let selectedYear = event.target.value;
        console.log(selectedYear);
        this.setState( () =>
        {
            return {year:selectedYear};
        });
    }

    /**
     * Fetches years to update state.
     */
    componentDidMount()
    {
        console.log("componentDidMount");
        // Typical usage (don't forget to compare props):
        axios.get(`http://www.soft.test/years`)
            .then(resp => {
                // console.log(resp)
                this.setState(() => {
                    return {years: resp.data.data}
                }, () => {
                    console.log(this.state.years)
                })
            })
    }

    componentDidUpdate(prevProps,prevState)
    {
        console.log("componentDidUpdate");
        // Typical usage (don't forget to compare):
        if (this.state.year !== prevState.year) {
            axios.get(`http://www.soft.test/years/${this.state.year}`)
                .then( response =>
                {
                    // console.log(response.data.data);
                    this.setState( () => {
                        return {yearData:JSON.parse(response.data.data)};
                    }, () => console.log(this.state.yearData))
                })
                .catch(err => console.log(err))        }
    }

    render() {
        console.log("render");
        let yearsItems = this.state.years.map( (item,index) =>
        {
            return <li key={index} value={item.year}
                       className={"cursor-pointer"}
                       onClick={this.setYear} >
                {item.year}
            </li>;
        });

        let categoryItems = this.state.yearData.categories.map( (item, index) =>
        {
            return <div key={index} value={item.title}>
                <span style={{margin: "0 10px"}}>{item.maximum_value}</span>
                <span style={{margin: "0 10px"}}>{item.value}</span>
                <span style={{margin: "0 10px"}}>{item.title}</span>
            </div>;
        })

        return (
            <div className="Container">
                <table className="table table-striped" width={1000}>
                    <thead>
                        <tr>
                            <td>Categories</td>
                            <td>Circle 2</td>
                            <td>Circle 1</td>
                            <td>Years</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ul>
                                    {categoryItems}
                                </ul>
                            </td>
                            <td>{this.state.yearData.circle2}</td>
                            <td>{this.state.yearData.circle1}</td>
                            <td>
                                <ul>
                                    {yearsItems}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
