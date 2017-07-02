import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainContainer from './MainContainer'
import PanelWrapper from './PanelWrapper'
import APIHelper from "../util/APIHelper";
import Datetime from 'react-datetime';
import ReactDOM from 'react-dom'


class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            items:[]
		};

        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.handleClickFilterByProject = this.handleClickFilterByProject.bind(this)
        this.handleClickFilterByTime = this.handleClickFilterByTime.bind(this)

    }

    componentWillMount() {
        this.updateItems();
        this.updateProjects();
    }

    componentDidMount() {

    }

    updateItems(){
        APIHelper.getItems()
        .then(function(result){
	    		this.setState({
	    			items : result.data.result	
	    		})
	    	}.bind(this))
    }

    updateProjects(){
        APIHelper.getProjects()
        .then(function(result){
	    		this.setState({
	    			projects : result.data.result	
	    		})
	    	}.bind(this))
    }

    onChangeStartTime(m){
        this.setState({
            from_value : m.unix()
        })
    }
    onChangeEndTime(m){
        this.setState({
            to_value : m.unix()
        })
    }

    handleClickFilterByProject(){
        var selected_project = ReactDOM.findDOMNode(this.select).value;
        APIHelper.getByProject(selected_project)
        .then(function(result){
	    		this.setState({
	    			items : result.data.result	
	    		})
	    	}.bind(this))
    }

    handleClickFilterByTime(){
        APIHelper.getByTime(String(this.state.from_value),String(this.state.to_value))
        .then(function(result){
	    		this.setState({
	    			items : result.data.result	
	    		})
	    	}.bind(this))
    }
    
    render() {
        var itemsContent = []
        var itemProjectSelectOptions = []
        for(var i in this.state.projects){
            itemProjectSelectOptions.push(<option>{this.state.projects[i].name}</option>)
        }
        for(var i in this.state.items){
            var start = new Date(Number(this.state.items[i].start)*1000)
            var end = new Date(Number(this.state.items[i].end)*1000)
            itemsContent.push(<tr><td>{this.state.items[i].project}</td><td>{String(start)}</td><td>{String(end)}</td></tr>)
        }


        return (
            <MainContainer>
                <PanelWrapper header='Report' size='col-sm-12'>
                    <div className="panel-body">
                        <h3>Filtering options</h3>
                        <div className="input-group">
                                <select id="project_select" className="form-control"  ref={select => { this.select = select }}>
                                    {itemProjectSelectOptions}
                                </select>
                            <span className="input-group-btn">
                                <button className="btn btn-success" type="submit" onClick={this.handleClickFilterByProject} >Filter By Project</button>
                            </span>
                        </div>
                        <div className="input-group">    
                                <label >From<Datetime onChange={this.onChangeStartTime} className="dateTimeField"/></label>
                                <label>To<Datetime onChange={this.onChangeEndTime} className="dateTimeField"/></label>
                            <span className="input-group-btn">
                                <button className="btn btn-success" type="submit" onClick={this.handleClickFilterByTime} >Filter By Time</button>
                            </span>
                        </div>
                    </div>
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
                </PanelWrapper>

            </MainContainer>
        );
    }
}

ReportContainer.propTypes = {

};

export default ReportContainer;