import React, { Component } from 'react';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
		};
    }

    componentWillMount() {
    }

    componentDidMount() {

    }


    render() {
        var itemsContent = []
        
        for(var j in this.props.dataArray){
            var start = new Date(Number(this.props.dataArray[j].start)*1000)
            var end = new Date(Number(this.props.dataArray[j].end)*1000)
            itemsContent.push(<tr><td>{this.props.dataArray[j].project}</td><td>{String(start)}</td><td>{String(end)}</td></tr>)
        }

        return (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsContent}
                        </tbody>
                    </table>
            
        );
    }
}



export default DataTable;